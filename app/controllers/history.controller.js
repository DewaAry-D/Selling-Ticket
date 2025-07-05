const { validationResult } = require('express-validator');

const { orderList } = require('../model/order.model');
const { orderItemList } = require('../model/order_item.model');
const { qrList } = require('../model/qr_code.modul');
const { biodataList } = require('../model/biodata.model');


const show = (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const orders = orderList.findAll(req.user.id);
    console.log("tahap 1");
    

    orders.forEach(order => {
        console.log("tahap lop1");
        const orderitems = orderItemList.findAll(order.id)
        console.log("tahap loop1-1");
        orderitems.forEach(orderitem => {
            console.log("tahap loop2");
            
            const qrs = qrList.findAll(orderitem.id);
            console.log("tahap loop2-1");
            orderitem.qrs = qrs
        });
        order.orderitems = orderitems;
    });

    const biodata = biodataList.findByUserId(req.user.id);
    const user = req.user;

    return res.render('history', { orders, biodata, user});
}

module.exports = {
    show
}