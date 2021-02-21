const isAuth = require('./isAuth');
const login = require('./login');
const logout = require('./logout');
const getUser = require('./getuser');
const updateUser = require('./updateuser');
const deleteUser = require('./deleteuser');

const jwtMiddleware = require('../../lib/jwtMiddleware');

const express = require('express');
const router = express.Router();

router.get('/isAuth', jwtMiddleware, isAuth);
router.post('/login', login);
router.get('/logout', jwtMiddleware, logout);
router.get('/getuser', jwtMiddleware, getUser);
router.post('/updateuser', jwtMiddleware, updateUser);
router.get('/deleteuser', jwtMiddleware, deleteUser);

module.exports = router;
