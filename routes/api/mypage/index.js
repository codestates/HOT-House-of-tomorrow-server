const getLikePost = require('./getlikepost');
const getPost = require('./getpost');

const express = require('express');
const router = express.Router();

router.get('/getpost', getPost);
router.get('/getlikepost', getLikePost);

module.exports = router
