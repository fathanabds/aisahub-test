const StoreController = require('../controllers/StoreController');
const isAdmin = require('../middlewares/isAdmin');
const express = require('express');

const router = express.Router();

// base url => /stores
router.get('/', isAdmin, StoreController.findAll);

module.exports = router;
