const express = require('express');
const OrderController = require('../controllers/OrderController');
const isAdmin = require('../middlewares/isAdmin');
const isDeliveryManager = require('../middlewares/isDeliveryManager');
const router = express.Router();

// base url => /orders
router.get('/', OrderController.findAll);
router.post('/', isAdmin, OrderController.create);
router.get('/:id', isDeliveryManager, OrderController.findOne);
router.patch('/:id', isDeliveryManager, OrderController.update);

module.exports = router;
