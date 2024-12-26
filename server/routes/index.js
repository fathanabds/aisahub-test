const express = require('express');
const authentication = require('../middlewares/auth');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use(authentication);
router.use('/orders', require('./orders'));

module.exports = router;
