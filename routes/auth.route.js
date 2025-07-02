const { Router } = require('express');
const upload = require('../app/middlewares/upload.middleware');
const { register, login, show } = require('../app/controllers/auth.controller');
const { registerValidator, loginValidator } = require('../app/validators/auth.validator');
const { showTicket } = require('../app/controllers/ticket.controller');
const { authMiddleware } = require('../app/middlewares/auth.middleware');


const router = Router();

router.post('/register', upload.single('foto_profile'), registerValidator, register);

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', loginValidator, login);

// router.get('/show', show);

router.get('/dashboard', authMiddleware, showTicket);

module.exports = router;