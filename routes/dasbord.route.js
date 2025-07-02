const { Router } = require('express');
const { showTicket } = require('../app/controllers/ticket.controller');
const { authMiddleware } = require('../app/middlewares/auth.middleware');

const router = Router();

router.get('/dashboard', authMiddleware, showTicket);


module.exports = router;