const { response } = require("express");
const Post = require('../models/post')

const getPosts = async (req, res = response) => {
    try {
        const from = Number(req.query.from) || 0;
        const [ posts, total ] = await Promise.all([
            Post.find({}, 'title body date creator').skip(from).limit(2).populate('creator', 'name'),
            Post.countDocuments()
        ]);

        res.json({
            ok: true,
            total,
            posts: posts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong, talk to admin'
        });
    }
}

const getPostById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const post = await Post.findById(id)
            .populate('creator', 'name');
        
        res.json({
            ok: true,
            post
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Somthing went wrong, talk to admin'
        })
    }
}

const createPost = async (req, res = response) => {
    try {
        const { title, body, date, creator } = req.body;
        const post = new Post({ title, body, date, creator });

        // Guardar en BD
        await post.save();

        res.json({
            ok: true,
            post
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err
        })
        console.log(err);
    }

}

module.exports = {
    getPosts,
    getPostById,
    createPost,
}