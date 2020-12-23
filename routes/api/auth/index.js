const isAuth = require('./isAuth');
const login = require('./login');
const logout = require('./logout');
const getUser = require('./getuser');
const updateUser = require('./updateuser');
const deleteUser = require('./deleteuser');

const express = require('express');
const router = express.Router();

router.get('/isAuth', isAuth);
router.post('/login', login);
router.get('/logout', logout);
router.get('/getuser', getUser);
router.post('/updateuser', updateUser);
router.get('/deleteuser', deleteUser);

module.exports = router;
