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

    return res.status(201).json({
        status: "sukses",
        message: "Cart berhasil dibuat",
        data : newCart
    })
}

const updateCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const ticket = ticketList.findById(req.params.cartId);
    const quantity = parseInt(req.body.quantity);
    const total = quantity * ticket.price;

    const data = cartList.updateById(req.params.cartId, { quantity: quantity, total: total })

    return res.status(200).json({
        status: "sukses",
        message: "Cart berhasil diupdate",
        data : data
    });
}

const delateCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = cartList.delateById(req.params.cartId);

    return res.status(200).json({
        status: "sukses",
        message: "Cart berhasil dihapus",
        data : data
    });
}

const showCart = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = cartList.findAll(req.user.id);

    return res.status(200).json({
        status: "sukses",
        message: "Cart berhasil didapatkan",
        data : data
    });
}

module.exports = {
    createCart,
    updateCart,
    delateCart,
    showCart
}