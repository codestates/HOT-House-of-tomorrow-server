const getLikePost = require('./getlikepost');
const getPost = require('./getpost');

const jwtMiddleware = require('../../lib/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.get('/getpost/:userId', getPost);
router.get('/getlikepost', jwtMiddleware, getLikePost);

module.exports = router;
