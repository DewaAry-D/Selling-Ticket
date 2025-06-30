const { ticketApplicationList } = require('../model/ticket_application.model');


function acceptedAccess (req, res, next) {
    const data = ticketApplicationList.findById(req.params.ticketApplicationId);

    //cekadmin

    if (!data) {
        return res.status(404).json({
        status: 'gagal',
        message: 'Data ticket application tidak ditemukan'
        });
    }

    if (data.is_accepted) {
        return res.status(400).json({
        status: 'gagal',
        message: 'Permintaan sudah diterima sebelumnya'
        });
    }

    if (data.is_rejected) {
        return res.status(400).json({
            status: "gagal",
            message: "permintaan sudah ditolak sebelumnya tidak bisa diterima, tunggu update dari user"
        })
    }

    next();
}

function rejectedAccess (req, res, next) {
    const data = ticketApplicationList.findById(req.params.ticketApplicationId);

    //cekadmin

    if (!data) {
        return res.status(404).json({
        status: 'gagal',
        message: 'Data ticket application tidak ditemukan'
        });
    }

    if (data.is_rejected) {
        return res.status(400).json({
            status: "gagal",
            message: "permintaan sudah ditolak sebelumnya"
        })
    }

    if (data.is_accepted) {
        return res.status(400).json({
        status: 'gagal',
        message: 'Permintaan sudah diterima sebelumnya dan tidak bisa ditolak lagi'
        });
    }

    next();
}


module.exports = {
    acceptedAccess,
    rejectedAccess
}