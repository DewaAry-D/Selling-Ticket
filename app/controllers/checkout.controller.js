const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const { userList } = require('../model/user.model');
const { ticketList } = require('../model/ticket.model');
const { cartList } = require('../model/cart.model');
const { orderList } = require('../model/order.model');
const { orderItemList } = require('../model/order_item.model');
const { qrList } = require('../model/qr_code.modul');

const qrFolderPath = path.join(__dirname, '../public/', 'qrcodes');
if (!fs.existsSync(qrFolderPath)) {
    fs.mkdirSync(qrFolderPath);
}


const checkout =  async (req, res) => {
    const carts = cartList.findAll(req.user.id);

    if (!carts.length) {
        return res.status(200).json({
            status: "sukses",
            message: "Tidak ada data"
        });
    }

    let fee = 10000;
    let rolebackOrder;
    let roleBackItems = [];
    let roleBackQrs = [];

    let arryTampungTickets = [];

    try {
        const orderId = uuidv4();
        const orderNumber = 'RES-' + Date.now() + '-' + Math.round(Math.random() * 1E9);

        let total = 0;
        const order = orderList.append(orderId, carts[0].user_id, orderNumber,total);

        rolebackOrder = order.id;

        //oreder items
        for (const cart of carts) {
            const orderItemId = uuidv4();
            //mmasukkan ke linkedlist
            const totalPrice = cart.quantity * cart.ticket_id.price;
            total += totalPrice;

            let limit = cart.ticket_id.available_limit;

            const orderItem = orderItemList.append(orderItemId, orderId, cart.ticket_id, cart.quantity, cart.ticket_id.price, totalPrice);

            roleBackItems.push(orderItem.id);

            let count = 1;
            //qrcode
            for (let i = cart.quantity; i > 0; i--) {
                const qr_id = uuidv4();
                const ticketCode = cart.ticket_id.code + '-' + (cart.ticket_id.limit - cart.ticket_id.available_limit + count);
                const jsonData = {
                    id: qr_id,
                    username:cart.user_id.username,
                    namatiket: cart.ticket_id.name,
                    code: ticketCode,
                    type: cart.ticket_id.type_tickets,
                    batch: cart.ticket_id.batch
                }

                limit -= 1;
                if (limit <= 0) {
                    throw new Error(`jumlah ticket untuk ticket ${cart.ticket_id}`);
                    
                }

                //buat qrcode
                const stringified = JSON.stringify(jsonData, null, 2);
                const fileName = `qrjson-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
                const filePath = path.join(qrFolderPath, fileName);
                await QRCode.toFile(filePath, stringified);

                //masukkan ke linkedlist
                qrList.append(qr_id, orderItemId, ticketCode, filePath);

                roleBackQrs.push(qr_id);
            
                //tambah count
                count++;
            }

            //backup demi menjaga jumlah ticket
            arryTampungTickets.push({
                ticket_id: cart.ticket_id,
                quantity: cart.quantity,
                origin_avilable_limit: cart.ticket_id.available_limit
            });

        }

        
        total += fee;
        orderList.updateById(orderItem.id, { total_price: total });


        for (const ticket of arryTampungTickets) {
            const available_limit = ticket.ticket_id.available_limit - ticket.quantity;
            ticketList.updateById(ticket.ticket_id.id, {available_limit: available_limit});
        }

        //hapus cart
        for (const cart of carts) {
            cartList.delateById(cart.id);
        }

        return res.status(201).json({
            status: "sukses",
            message: "Ticket berhasil dibeli"
        })

    } catch (error) {
        if (rolebackOrder) {
            orderList.delateById(rolebackOrder);
        }

        if (roleBackItems.length) {
            for (const item of roleBackItems) {
                orderItemList.delateById(item);
            }
        }

        if (roleBackQrs.length) {
            for (const qr of roleBackQrs) {
                qrList.delateById(qr);
            }
        }

        if (arryTampungTickets.length) {
            for (const tampung of arryTampungTickets) {
                ticketList.updateById(tampung.ticket_id.id, {
                    available_limit: tampung.ticket_id.available_limit
                });
            }
        }
        

        return res.status(500).json({
            status: "Gagal",
            message: error.message
        })
    }
}