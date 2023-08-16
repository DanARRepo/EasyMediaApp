const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '', userName = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid, userName };

        jwt.sign(payload, process.env.SECRETEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}