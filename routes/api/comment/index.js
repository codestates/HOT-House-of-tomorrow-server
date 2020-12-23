const deleteComment = require('./delete');
const updateComment = require('./update');
const writeComment = require('./write');

const express = require('express');
const router = express.Router();

router.post('/delete', deleteComment);
router.post('/update', updateComment);
router.post('/write', writeComment);


module.exports = router
