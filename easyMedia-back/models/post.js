const { Schema, model } = require("mongoose");

const PostsSchema = Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    creator: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

PostsSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Posts', PostsSchema);