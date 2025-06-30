const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const dotenv = require("dotenv");
dotenv.config();

const { userList } = require('../model/user.model');
const { ticketApplicationList } = require('../model/ticket_application.model');
const { ticketList } = require('../model/ticket.model');

const apllicationAccepted = (req, res) => {
    const data = ticketApplicationList.findById(req.params.ticketApplicationId);

    const id = uuidv4();
    const ticket = ticketList.append(
        id, 
        data.user_id.id, 
        data.id, data.name, 
        data.code, 
        data.description, 
        data.theme, 
        data.type_tickets, 
        data.batch, 
        data.start_date, 
        data.end_date, 
        data.price, 
        data.limit, 
        data.limit, 
        data.start_event, 
        data.end_event,
        data.foto_event,
        data.location
    );

    ticketApplicationList.updateById(req.params.ticketApplicationId, { is_accepted: true });

    return res.status(201).json({
        status: "sukses",
        message: "berhasil menerima pengajuan tiket dan pembuatan ticket",

        tiket: ticket
    })
}

const apllicationRejected = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data  = {
        reject_message: req.body.reject_message,
        is_rejected: true
    }

    const newData = ticketApplicationList.updateById(req.params.ticketApplicationId, data);

    return res.status(201).json({
        status: "sukses",
        message: "berhasil menolak pengajuan tiket dan pembuatan ticket",
        data: newData
    })
}

const adminShowApplication = (req, res) => {
    const data = ticketApplicationList.show(req.query);

    if (!data.data.length) {
        return res.status(200).json({
            status: "gagal",
            message: "data kosong"
        });
    }

    return res.status(200).json({
        status: "sukses",
        message: "berhasil mendapatkan data",
        data: data
    });
}

module.exports = {
    apllicationAccepted,
    apllicationRejected,
    adminShowApplication
}