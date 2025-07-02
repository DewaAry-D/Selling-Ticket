const { userList } = require('../model/user.model');
const { ticketList } = require('../model/ticket.model');

const showTicket = (req, res) => {
    const data = ticketList.show(req.query);

    if (!data.data.length) {
        return res.render('dashboard');
    }

    const tickets = data.data;

    return res.render('dashboard', {tickets});
};


module.exports = {
    showTicket
}