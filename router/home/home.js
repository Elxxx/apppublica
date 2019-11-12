const express = require('express');
const router = express();
const home = require('../../controller/home/home');

router.get('/', home.homeDashboard);

module.exports = router;