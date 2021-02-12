const deleteComment = require('./delete');
const updateComment = require('./update');
const writeComment = require('./write');

const jwtMiddleware = require('../../lib/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.post('/delete', jwtMiddleware, deleteComment);
router.post('/update', jwtMiddleware, updateComment);
router.post('/write', jwtMiddleware, writeComment);

module.exports = router;
