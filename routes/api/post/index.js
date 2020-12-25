const updatePost = require('./update');
const writePost = require('./write');
const deletePost = require('./delete');
const readPost = require('./read');

const express = require('express');
const router = express.Router();

router.post('/delete', deletePost);
router.post('/update', updatePost);
router.post('/write', writePost);
router.get('/read/:postId', readPost);

module.exports = router;
