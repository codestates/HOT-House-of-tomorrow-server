const updatePost = require('./update');
const writePost = require('./write');
const deletePost = require('./delete');
const readPost = require('./read');

const jwtMiddleware = require('../../lib/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.post('/delete', jwtMiddleware, deletePost);
router.post('/update', jwtMiddleware, updatePost);
router.post('/write', jwtMiddleware, writePost);
router.get('/read/:postId', readPost);

module.exports = router;
