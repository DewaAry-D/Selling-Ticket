const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Token tidak tersedia' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_STR);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token tidak valid' });
    }
}

module.exports = {
    authMiddleware
}