const { userList } = require('../model/user.model');
const { body, param, query, check } = require('express-validator');

const registerValidator = [
  body('email')
    .isEmail().withMessage('Email tidak valid')
    .custom((value, { req }) => {
      const isSameEmail = userList.findByEmail(req.body.email);

      if (isSameEmail) {
          throw new Error('email ini sudah digunakan');
      }

      return true;
    }),

  body('password')
    .notEmpty().withMessage('password tidak boleh kosong')
    .isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),

  body('confirm_password')
    .notEmpty().withMessage('password tidak boleh kosong')
    .isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Konfirmasi password tidak cocok');
      }
      return true;
    }),
    
  body('username')
    .isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
    .notEmpty().trim().withMessage('Password minimal 6 karakter'),

  body('name')
    .notEmpty().withMessage('Nama tidak boleh kosong')
    .isLength({ max: 255 }).withMessage('Nama maksimal 255 karakter'),

  body('date_of_birth')
    .notEmpty().withMessage('Tanggal lahir wajib diisi')
    .isDate().withMessage('Format tanggal lahir harus valid (YYYY-MM-DD)'),

  body('phone_number')
    .notEmpty().withMessage('Nomor HP wajib diisi')
    .isMobilePhone('id-ID').withMessage('Nomor HP tidak valid')
    .isLength({ max: 15 }).withMessage('Nomor HP maksimal 15 karakter'),

  body('province')
    .notEmpty().withMessage('Provinsi wajib diisi')
    .isLength({ max: 255 }).withMessage('Provinsi maksimal 255 karakter'),

  body('city')
    .notEmpty().withMessage('Kota wajib diisi')
    .isLength({ max: 255 }).withMessage('Kota maksimal 255 karakter'),

  body('address')
    .notEmpty().withMessage('Alamat wajib diisi')
    .isLength({ max: 255 }).withMessage('Alamat maksimal 255 karakter'),
  
  check('foto_profile')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('File wajib diunggah');
      }

      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        throw new Error('Hanya file JPG atau PNG yang diizinkan');
      }

      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) {
        throw new Error('Ukuran file maksimal 2MB');
      }

      return true;
    })
];

const loginValidator = [
  body('email').isEmail().withMessage('Email tidak valid'),

  body('password')
    .notEmpty().withMessage('password tidak boleh kosong')
    .isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
]

module.exports = { 
  registerValidator,
  loginValidator 
};