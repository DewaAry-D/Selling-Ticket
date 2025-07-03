const { Router } = require('express');
const { createValidatorCart, updateValidatorCart, delateValidatorCart, viewValidatorCart } = require('../app/validators/cart.validator');
const { createCart, updateCart, delateCart, showCart } = require('../app/controllers/cart.controller');
const { authMiddleware } = require('../app/middlewares/auth.middleware');


const router = Router();

router.get('/cart/:userId', authMiddleware, viewValidatorCart, showCart);
router.post('/cart/:userId', authMiddleware, createValidatorCart, createCart);
router.patch('/cart/:cartId', authMiddleware, updateValidatorCart,updateCart);
router.delete('/cart/:cartId', authMiddleware, delateValidatorCart, delateCart);

module.exports = router;