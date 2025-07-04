const { Router } = require('express');
const { viewValidatorCart } = require('../app/validators/cart.validator');
const { show  } = require('../app/controllers/history.controller');
const { authMiddleware } = require('../app/middlewares/auth.middleware');

const router = Router();

route.get('/history/:userId', authMiddleware, viewValidatorCart, show);

module.exports = router;