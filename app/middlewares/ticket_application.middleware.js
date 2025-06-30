const { ticketApplicationList } = require('../model/ticket_application.model');

function validationAccess(req, res, next) {
    const ticketAplication = ticketApplicationList.findById(req.params.ticketApplicationId);

    if (!ticketAplication) {
        return res.status(401).json({ message: 'Pengajuan Tidak ditemukan' });
    }
    if (ticketAplication.user_id.id !== req.user.id || !ticketAplication.is_rejected) {
        return res.status(401).json({ message: 'Akses ditolak' });
    }

    next();
}

module.exports = {
    validationAccess
}