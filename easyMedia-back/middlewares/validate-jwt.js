const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {
    // Leer token 
    const token = req.header('token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETEKEY );
        req.uid = uid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}