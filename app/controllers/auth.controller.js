const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


const { userList } = require('../model/user.model');
const { biodataList } = require('../model/biodata.model');


const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userId = uuidv4();
    const biodataId = uuidv4();
    const fotoProfile = req.file;

    const newUser = userList.append(userId, data.username, data.email, hashedPassword);
    const newBiodata = biodataList.append(biodataId, newUser, data.name, data.date_of_birth, data.phone_number, data.province, data.city, data.address, fotoProfile);

    return res.status(201).json({
        status: "sukses",
        message: "User berhasil dibuat",
        user: newUser,
        biodata: newBiodata
    })
}

const show = async (req, res) => {
    const data = userList.show();

    return res.status(200).json({
        data: data
    })
}

const  login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = userList.findByEmail(req.body.email);
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!user || !isMatch) {
        return res.status(404).json({
            status: "error",
            message: "email atau password salah"
        })
    }

    const token =jwt.sign({ id: user.id }, process.env.SECRET_STR, { expiresIn: 60 * 60 * 6 });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'Strict',
        maxAge: 60 * 60 * 6
    });

    res.status(200).json({
        status: "sukses",
        message: "berahisl login",
        data: user
    })
}


module.exports = {
    register,
    show,
    login 
}