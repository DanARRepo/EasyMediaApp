const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is re1quired']
    },
    email: {
        type: String,
        required: [true, 'The email is re1quired'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is re1quired']
    },
    state: {
        type: Boolean,
        default: true
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );