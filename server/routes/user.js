const UserController = require('../controllers/UserController');
const isAdmin = require('../middlewares/isAdmin');
const express = require('express');

const router = express.Router();

// base url => /users
router.get('/', isAdmin, UserController.findAllCustomers);

module.exports = router;
