const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const { userList } = require('../model/user.model');
const { ticketList } = require('../model/ticket.model');
const { cartList } = require('../model/cart.model');

const createCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = uuidv4();
    const quantity = parseInt(req.body.quantity);
    const ticketId = ticketList.findById(req.body.ticket_id);
    const userId = userList.findById(req.user.id);

    const total = quantity * ticketId.price;
    const newCart = cartList.append(id, userId, ticketId, quantity, total);

    console.log("proses pembuatan cart berhasil");
    // return res.status(201).json({
    //     status: "sukses",
    //     message: "Cart berhasil dibuat",
    //     data : newCart
    // })
    console.log(newCart);

    res.redirect('/dashboard');
}

const updateCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const ticket = ticketList.findById(req.body.ticket_id);

    if (!ticket) {
        return res.status(404).json({ error: "Ticket tidak ditemukan" });
    }
    
    const quantity = parseInt(req.body.quantity);
    const total = quantity * ticket.price;

    const data = cartList.updateById(req.params.cartId, { quantity: quantity, total: total })

    // return res.status(200).json({
    //     status: "sukses",
    //     message: "Cart berhasil diupdate",
    //     data : data
    // });
    res.redirect(`/cart/${req.user.id}`);
}


// const updateCart = (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const cartId = req.params.cartId;
//     const cart = cartList.findById(cartId);

//     if (!cart) {
//         return res.status(404).json({ error: "Cart item tidak ditemukan" });
//     }

//     const ticket = ticketList.findById(cart.ticket_id);
//     if (!ticket) {
//         return res.status(404).json({ error: "Ticket tidak ditemukan" });
//     }

//     const quantity = parseInt(req.body.quantity);
//     if (isNaN(quantity) || quantity <= 0) {
//         return res.status(400).json({ error: "Jumlah tiket tidak valid" });
//     }

//     const total = quantity * ticket.price;
//     const data = cartList.updateById(cartId, { quantity, total });

//     const user = req.user;
//     if (!user) {
//         return res.status(401).json({ error: "User tidak terautentikasi" });
//     }

//     res.redirect(`/cart/${user.id}`);
// };


const delateCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = cartList.delateById(req.params.cartId);

    // return res.status(200).json({
    //     status: "sukses",
    //     message: "Cart berhasil dihapus",
    //     data : data
    // });

    const user = req.user;
    res.redirect(`/cart/${user.id}`);
}

const showCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let total = 0;
    const datas = cartList.findAll(req.user.id);

    if (datas) {
        total += 10000;
        datas.forEach(item => {
            total += item.total;
        });
    }

    const user = req.user;

    // return res.status(200).json({
    //     status: "sukses",
    //     message: "Cart berhasil didapatkan",
    //     data : data,
    //     total: total
    // });

    return res.render('cart', { datas, total, user });
}

module.exports = {
    createCart,
    updateCart,
    delateCart,
    showCart
}