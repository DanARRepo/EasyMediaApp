const { Router } = require("express");
const { getPosts, createPost, getPostById } = require("../controller/posts.controller");
const { validateJWT } = require("../middlewares");

const router = Router();

router.get('/', validateJWT,getPosts);

router.get('/:id', validateJWT, getPostById);

router.post('/', validateJWT ,createPost);

module.exports = router;