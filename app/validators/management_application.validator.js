const { body, param, query, check } = require('express-validator');

const rejectedValidator = [
    body('reject_message')
        .notEmpty().withMessage('reject message tidak boleh kosong'),
];

module.exports = {
    rejectedValidator
}