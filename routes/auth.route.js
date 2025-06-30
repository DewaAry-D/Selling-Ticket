const { Router } = require('express');
const upload = require('../app/middlewares/upload.middleware');
const { register, login, show } = require('../app/controllers/auth.controller');
const { registerValidator, loginValidator } = require('../app/validators/auth.validator');


const router = Router();

router.post('/register', upload.single('foto_profile'), registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/show', show);

module.exports = router;