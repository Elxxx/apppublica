const express = require('express');
const router = express();
const error = require('../../controller/error/error');

router.get('/login/error', error.error);

module.exports = router;