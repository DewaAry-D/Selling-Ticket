const { orderList } = require('../model/order.model');
const { orderItemList } = require('../model/order_item.model');
const { qrList } = require('../model/qr_code.modul');


const show = (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const orders = orderList.findAll(req.user.id);

    orders.forEach(order => {
        const orderitems = orderItemList.findAll(order.id)
        orderitems.forEach(orderitem => {
            const qrs = qrList.findAll(orderitem.id);
            orderitem.qrs = qrs
        });
        order.orderitems = orderitems;
    });

    return res.render('history', { orders });
}

module.exports = {
    show
}