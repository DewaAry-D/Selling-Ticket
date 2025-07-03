const { Router } = require('express');
const { checkout } = require('../app/controllers/checkout.controller');
const { authMiddleware } = require('../app/middlewares/auth.middleware');

const router = Router();

router.post('/checkout/:userId', authMiddleware, checkout);

module.exports = router;