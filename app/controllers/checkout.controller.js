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
    fs.mkdirSync(qrFolderPath, { recursive: true });
}

const checkout =  async (req, res) => {
    const carts = cartList.findAll(req.user.id);

    if (!carts.length) {
        return res.status(200).json({
            status: "sukses",
            message: "Tidak ada data"
        });
    }

    console.log(`step ini lolos 1`);

    let fee = 10000;
    let rolebackOrder;
    let roleBackItems = [];
    let roleBackQrs = [];

    let arryTampungTickets = [];

    console.log(`step ini lolos 2`);

    try {
        console.log(`step ini lolos 3`);

        const orderId = uuidv4();
        const orderNumber = 'RES-' + Date.now() + '-' + Math.round(Math.random() * 1E9);

        console.log(`step ini lolos 4`);

        const user = userList.findById(req.user.id);

        console.log(`step ini lolos 5`);
        let total = 0;
        const order = orderList.append(orderId, user, orderNumber, total);
        console.log(`step ini lolos 6`);
        rolebackOrder = order.id;
        

        for (const cart of carts) { 
            // const ticket = ticketList.findById(cart.ticket_id.id); // ambil objek tiket
            const ticket = cart.ticket_id;

            console.log(`ini isi cart.ticket_id ${ticket.id}`);

            if (!ticket) {
                throw new Error('ticket_id is not defined');
            }



            const totalPrice = cart.quantity * ticket.price;
            total += totalPrice;

            let limit = ticket.available_limit;


            console.log("order", order);      // seharusnya berisi order_id atau OrderNode
            console.log("ticket", ticket);    // seharusnya berisi ticket_id atau TicketNode
            console.log("cart.quantity", cart.quantity);
            console.log("ticket.price", ticket.price);
            console.log("totalPrice", totalPrice);


            const orderItemId = uuidv4();
            const orderItem = orderItemList.append(
                orderItemId,
                order,
                ticket,
                cart.quantity,
                ticket.price,
                totalPrice
            );

            console.log(`step ini lolos 7`);
            
            roleBackItems.push(orderItem.id);

            let count = 1;
            for (let i = cart.quantity; i > 0; i--) {
                const qr_id = uuidv4();
                const ticketCode = ticket.code + '-' + (ticket.limit - ticket.available_limit + count);

                const jsonData = {
                    id: qr_id,
                    username: cart.user_id.username,
                    namatiket: ticket.name,
                    code: ticketCode,
                    type: ticket.type_tickets,
                    batch: ticket.batch
                };

                limit -= 1;
                if (limit <= 0) {
                    throw new Error(`jumlah ticket untuk ticket ${ticket.name} telah habis`);
                }

                const stringified = JSON.stringify(jsonData, null, 2);
                const fileName = `qrjson-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
                const filePath = path.join(qrFolderPath, fileName);
                await QRCode.toFile(filePath, stringified);

                qrList.append(qr_id, orderItemId, ticketCode, filePath);
                roleBackQrs.push(qr_id);
                count++;
            }

            console.log(`step ini lolos 8`);

            arryTampungTickets.push({
                ticket_id: ticket,
                quantity: cart.quantity,
                origin_avilable_limit: ticket.available_limit
            });
        }

        console.log(`step ini lolos 9`);
        total += fee;
        orderList.updateById(order.id, { total_price: total });
        console.log(`step ini lolos 10`);


        for (const ticket of arryTampungTickets) {
            const available_limit = ticket.ticket_id.available_limit - ticket.quantity;
            ticketList.updateById(ticket.ticket_id.id, {available_limit: available_limit});
        }

        console.log(`step ini lolos 11`);
        //hapus cart
        for (const cart of carts) {
            cartList.delateById(cart.id);
        }
        console.log(`step ini lolos 12`);

        // return res.status(201).json({
        //     status: "sukses",
        //     message: "Ticket berhasil dibeli"
        // })
        return res.redirect(`/cart/${req.user.id}`);

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

module.exports = {
    checkout
}