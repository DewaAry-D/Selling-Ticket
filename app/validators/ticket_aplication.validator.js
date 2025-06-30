const { listTicketAplication } = require('../model/ticket_application.model');
const { body, param, query, check } = require('express-validator');

const createTicketAplicationValidator = [
    body('name')
        .notEmpty().withMessage('Nama wajib diisi')
        .isLength({ max: 255 }).withMessage('Nama maksimal 255 karakter'),

    body('description')
        .notEmpty().withMessage('deskripsi wajib diisi')
        .isString().withMessage('Deskripsi harus berupa teks'),

    body('theme')
        .notEmpty().withMessage('Tema wajib diisi')
        .isIn(['education', 'music', 'sport', 'comedy', 'culture'])
        .withMessage('Tema tidak valid'),

    body('code')
        .notEmpty().withMessage('Kode wajib diisi')
        .isLength({ max: 5 }).withMessage('Kode maksimal 5 karakter'),

    body('type_tickets')
        .notEmpty().withMessage('Tipe tiket wajib diisi')
        .isString().withMessage('Tipe tiket harus berupa string'),

    body('batch')
        .notEmpty().withMessage('Batch wajib diisi')
        .isInt().withMessage('Batch harus berupa angka bulat'),

    body('start_date')
        .notEmpty().withMessage('Tanggal mulai wajib diisi')
        .isISO8601().withMessage('Format tanggal mulai tidak valid'),

    body('end_date')
        .notEmpty().withMessage('Tanggal akhir wajib diisi')
        .isISO8601().withMessage('Format tanggal akhir tidak valid'),

    body('price')
        .notEmpty().withMessage('Harga wajib diisi')
        .isNumeric().withMessage('Harga harus berupa angka'),

    body('limit')
        .notEmpty().withMessage('Limit wajib diisi')
        .isInt().withMessage('Limit harus berupa angka bulat'),

    check('file_application')
        .custom((value, { req }) => {
        const file = req.files?.['file_application']?.[0];

        if (!file) {
            throw new Error('File wajib diunggah');
        }

        if (file.mimetype !== 'application/pdf') {
            throw new Error('File harus berupa PDF');
        }
        return true;
        }),

    body('start_event')
        .notEmpty().withMessage('Tanggal mulai event wajib diisi')
        .isISO8601().withMessage('Format tanggal mulai event tidak valid'),

    body('end_event')
        .notEmpty().withMessage('Tanggal akhir event wajib diisi')
        .isISO8601().withMessage('Format tanggal akhir event tidak valid'),
    
    check('foto_event')
        .custom((value, { req }) => {
            const file = req.files?.['foto_event']?.[0];

            if (!file) {
            throw new Error('File wajib diunggah');
            }

            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new Error('Hanya file JPG atau PNG yang diizinkan');
            }

            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new Error('Ukuran file maksimal 2MB');
            }

            return true;
        })
]

const updateTicketApplicationValidator = [
    body('name')
        .optional()
        .isLength({ max: 255 }).withMessage('Nama maksimal 255 karakter'),

    body('description')
        .optional()
        .isString().withMessage('Deskripsi harus berupa teks'),

    body('theme')
        .optional()
        .isIn(['education', 'music', 'sport', 'comedy', 'culture'])
        .withMessage('Tema tidak valid'),

    body('code')
        .optional()
        .isLength({ max: 5 }).withMessage('Kode maksimal 5 karakter'),

    body('type_tickets')
        .optional()
        .isString().withMessage('Tipe tiket harus berupa string'),

    body('batch')
        .optional()
        .isInt().withMessage('Batch harus berupa angka bulat'),

    body('start_date')
        .optional()
        .isISO8601().withMessage('Format tanggal mulai tidak valid'),

    body('end_date')
        .optional()
        .isISO8601().withMessage('Format tanggal akhir tidak valid'),

    body('price')
        .optional()
        .isNumeric().withMessage('Harga harus berupa angka'),

    body('limit')
        .optional()
        .isInt().withMessage('Limit harus berupa angka bulat'),

    body('file_aplication')
        .optional()
        .custom((value, { req }) => {
        if (req.file && req.file.mimetype !== 'application/pdf') {
            throw new Error('File harus berupa PDF');
        }
        return true;
        }),

    body('start_event')
        .optional()
        .isISO8601().withMessage('Format tanggal mulai event tidak valid'),

    body('end_event')
        .optional()
        .isISO8601().withMessage('Format tanggal akhir event tidak valid'),
]

module.exports = {
    createTicketAplicationValidator,
    updateTicketApplicationValidator
}