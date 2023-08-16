const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User } = require('../models')
const { Post } = require('../models')

const searchUsers = async( term = '', res = response ) => {
    const isMongoID = ObjectId.isValid(term);

    if ( isMongoID ) {
        const user = await User.findById(term);
        res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = RegExp(term, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    });

}

const searchPosts = async( req, res = response ) => {
    const searchParam = req;
    const regex = new RegExp(searchParam, 'i');

    const [posts] = await Promise.all([
        Post.find({
            $or: [{ title: regex }, { date: regex }]
        }).populate('creator', 'name')
    ]);

    try {

        res.json({
            ok: true,
            posts
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const searchByCreator = async( req, res = response ) => {

    const [posts] = await Promise.all([
        Post.find({ creator: req }).populate('creator', 'name')
    ]);

    try {

        res.json({
            ok: true,
            posts
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const search = (req, res = response) => {

    const { colection, term } = req.params;

    switch (colection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'creatorPosts':
            searchByCreator(term, res);
            break;
        case 'posts':
            searchPosts(term, res);
            break;

        default:
            res.status(500).json({
                msg: 'this colection doesnt exist'
            })
    }
}

module.exports = {
    search,
    searchPosts
}