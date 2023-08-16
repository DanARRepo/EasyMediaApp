const { Router } = require('express');
const { search, searchPosts } = require('../controller/search.controller');
const { validateJWT } = require('../middlewares');

const router = Router();

router.get('/:search', searchPosts);

router.get('/:colection/:term', validateJWT, search);

module.exports = router;
