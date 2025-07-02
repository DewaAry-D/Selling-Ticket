const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const { userList } = require('../model/user.model');
const { ticketApplicationList } = require('../model/ticket_application.model');
const { ticketList } = require('../model/ticket.model');
const { render } = require('ejs');

const showTicket = (req, res) => {
    const data = ticketList.show(req.user.id, req.query);

    if (!data.data.length) {
        return res.render('dashboard');
    }

    return res.render('dashboard', data);
};


module.exports = {
    showTicket
}