const { ticketList } = require('../model/ticket.model');
const { userList } = require('../model/ticket.model');
const { cartList } = require('../model/cart.model');
const { body, param, query, check } = require('express-validator');

const createValidatorCart = [
    body['quantity']
        .notEmpty().withMessage('jumlah tidak boleh kosong')
        .custom((value, { req }) => {
            const quantity = parseInt(req.body.quantity);

            if (quantity <= 0) {
                throw new Error('salah input quantity');
            }

            return true;
        }),

    body['ticket_id']
        .notEmpty().withMessage('ticket_id tidak boleh kosong')
        .custom((value, { req }) => {
            const ticket = ticketList.findById(req.body.ticket_id);

            if (!ticket) {
                throw new Error('ticket tidak ditemukan');
            }

            return true;
        }),
]

const viewValidatorCart = [
    param['userId']
        .notEmpty().withMessage('Param tidak boleh kosong')
        .custom((value ,{req}) => {
            if (req.user.id != req.params.userId) {
                throw new Error('Page tidak ditemukan');
            }
            return true;
        })
]

const updateValidatorCart = [
    body['quantity']
        .notEmpty().withMessage('jumlah tidak boleh kosong')
        .custom((value, { req }) => {
            const quantity = parseInt(req.body.quantity);

            if (quantity <= 0) {
                throw new Error('salah input quantity');
            }

            return true;
        }),

    param['cartId']
        .notEmpty().withMessage('cart_id tidak boleh kosong')
        .custom((value, { req }) => {
            const userId = req.user.id;
            const cart = cartList.updateById(req.params.cartId);

            if (userId !== cart.user_id.id ) {
                throw new Error('salah input quantity');
            }

            return true;
        }),
]

const delateValidatorCart = [
    param['cartId']
        .notEmpty().withMessage('cart_id tidak boleh kosong')
        .custom((value, { req }) => {
            const userId = req.user.id;
            const cart = cartList.updateById(req.params.cartId);

            if (userId !== cart.user_id.id ) {
                throw new Error('salah input quantity');
            }

            return true;
        }),
]

module.exports = {
    createValidatorCart,
    updateValidatorCart,
    delateValidatorCart,
    viewValidatorCart
}