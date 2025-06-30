const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const dotenv = require("dotenv");
dotenv.config();

const { userList } = require('../model/user.model');
const { ticketApplicationList } = require('../model/ticket_application.model');

const createTicketApplication = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = uuidv4();
    const userId = userList.findById(req.user.id);
    const data = req.body;
    const fileApplication = req.files['file_application'][0];
    const fotoEvent = req.files['foto_event'][0];

    const newTicketApplicationList = ticketApplicationList.append(
        id,
        userId,
        data.name,
        data.description,
        data.theme,
        data.code,
        data.type_tickets,
        data.batch,
        data.start_date,
        data.end_date,
        fileApplication,
        data.price,
        data.limit,
        data.start_event,
        data.end_event,
        fotoEvent,
        data.location
    );

    return res.status(201).json({
        status: "sukses",
        message: "Permintaan berhasil dibuat",
        data : newTicketApplicationList
    })
}

const updateTicketApplication = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;

    if (req.files['file_application'][0]) {
        data.file_application = req.files['file_application'][0];
    }

    if (req.files['foto_event'][0]) {
        data.foto_event = req.files['foto_event'][0];
    }

    const newTicketApplicationList   = ticketApplicationList.updateById(req.params.ticketApplicationId, data);

    return res.status(200).json({
        status: "sukses",
        message: "Permintaan berhasil diupdate",
        data : newTicketApplicationList
    });
}

const showTicketApplication = (req, res) => {
    const data = ticketApplicationList.showForUser(req.user.id, req.query);

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
};



module.exports = {
    createTicketApplication,
    updateTicketApplication,
    showTicketApplication
}