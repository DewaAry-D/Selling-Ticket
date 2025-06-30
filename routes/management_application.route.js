const { Router } = require('express');

const { acceptedAccess, rejectedAccess, } = require('../app/middlewares/management.application.middleware')
const { rejectedValidator } = require('../app/validators/management_application.validator');
const { apllicationAccepted, apllicationRejected, adminShowApplication } = require('../app/controllers/management_ticket_application.controller');

const router = Router();

router.patch('/management_application/accept/:ticketApplicationId', acceptedAccess, apllicationAccepted); //cek is admin belum disi
router.patch('/management_application/reject/:ticketApplicationId', rejectedAccess, rejectedValidator, apllicationRejected); //cek is admin belum disi
router.get('/management_application', adminShowApplication); //cek is admin belum disi


module.exports = router;