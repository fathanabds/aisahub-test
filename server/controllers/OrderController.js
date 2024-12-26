const { Order } = require('../models');

class OrderController {
  static async findAll(req, res, next) {
    try {
      if (req.user.role === 'admin' || req.user.role === 'deliveryManager') {
        const orders = await Order.findAll();
        res.status(200).json(orders);
      } else {
        const orders = await Order.findAll({
          where: {
            UserId: req.user.id,
          },
        });
        res.status(200).json(orders);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      res.status(200).json(req.order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { UserId, amount, description, status } = req.body;
      const order = await Order.create({
        UserId,
        amount,
        description,
        status,
      });
      res.status(201).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { status } = req.body;
      req.order.status = status;
      await req.order.save();
      res.status(200).json(req.order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderController;
