const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jsw');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...uploadFile
}