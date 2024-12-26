const express = require('express');
const authentication = require('../middlewares/auth');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use(authentication);
router.use('/orders', require('./order'));
router.use('/users', require('./user'));
router.use('/stores', require('./store'));

module.exports = router;
