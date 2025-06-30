const { Router } = require('express');
const upload = require('../app/middlewares/upload.middleware');
const { createTicketAplicationValidator, updateTicketApplicationValidator }  = require('../app/validators/ticket_aplication.validator');
const { createTicketApplication, updateTicketApplication, showTicketApplication } = require('../app/controllers/ticket_application.controller');
const { authMiddleware } = require('../app/middlewares/auth.middleware');
const { validationAccess } = require('../app/middlewares/ticket_application.middleware')

const router = Router();

router.post('/ticket-application', authMiddleware, upload.fields([
        { name: 'file_application', maxCount: 1 },
        { name: 'foto_event', maxCount: 1 }
    ]), createTicketAplicationValidator, createTicketApplication);
router.patch('/ticket-application/:ticketApplicationId', authMiddleware, validationAccess, updateTicketApplicationValidator, updateTicketApplication); // belum ditambahkan middleware uservalidator
router.get('/ticket-application', authMiddleware, showTicketApplication); //for user

module.exports = router;