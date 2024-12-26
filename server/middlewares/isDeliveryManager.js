const { Order } = require('../models');

async function isDeliveryManager(req, res, next) {
  try {
    if (req.user.role === 'deliveryManager') {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        throw { name: 'NotFound' };
      }
      req.order = order;
      next();
    } else {
      throw { name: 'Forbidden' };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = isDeliveryManager;
