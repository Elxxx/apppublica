const express = require('express');
const router = express();
const login = require('../../controller/login/login');

router.post('/login', login.logInAuth);
router.get('/login', login.logIn);

module.exports = router;