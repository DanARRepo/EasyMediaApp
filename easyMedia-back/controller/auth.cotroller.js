const { response, request, json } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-jsw");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Validate email 
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            })
        }

        // Validate user state 
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'User / Password are not correct - state: false'
            });
        }

        // Validate password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Password is not correct'
            });
        }

        // Generate JWT 
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, call an admin'
        });
    }

};

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const userDB = await User.findById( uid );

    // Generar token - JWT
    const token = await generateJWT( uid, userDB.name );

    res.json({
        ok: true,
        token,
        user: userDB,
    });

}

module.exports = {
    login,
    renewToken
}