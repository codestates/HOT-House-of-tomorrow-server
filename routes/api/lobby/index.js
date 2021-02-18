const getPost = require('./getposts');
const likePost = require('./likepost');
const filter = require('./filter');

const jwtMiddleware = require('../../lib/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.get('/getposts', getPost);
router.post('/likepost', likePost);
router.get('/filter', filter);

module.exports = router;
