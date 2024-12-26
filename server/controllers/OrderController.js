const { Order, User, Store } = require('../models');

class OrderController {
  static async findAll(req, res, next) {
    try {
      const query = {
        include: [
          { model: User, attributes: ['email'] },
          { model: Store, attributes: ['name'] },
        ],
      };
      if (req.user.role === 'customer') {
        query.where = { UserId: req.user.id };
      }
      const orders = await Order.findAll(query);
      res.status(200).json(orders);
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
      const { StoreId, UserId, amount, description, status } = req.body;
      const order = await Order.create({
        StoreId,
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
