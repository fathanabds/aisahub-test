const { Op } = require('sequelize');
const { Order, User, Store } = require('../models');

class OrderController {
  static async findAll(req, res, next) {
    try {
      const { search, status, page } = req.query;
      const query = {
        limit: 5,
        offset: 0,
        where: {},
        order: [['createdAt', 'DESC']],
        include: [
          { model: User, attributes: ['email'] },
          { model: Store, attributes: ['name'] },
        ],
      };
      if (search) {
        query.where.description = {
          [Op.iLike]: `%${search}%`,
        };
      }
      if (status) {
        query.where.status = status;
      }
      if (page) {
        query.offset = (page - 1) * query.limit;
      }
      if (req.user.role === 'customer') {
        query.where.UserId = req.user.id;
      }
      const { rows, count } = await Order.findAndCountAll(query);
      res.status(200).json({ orders: rows, pagination: { totalPages: Math.ceil(count / query.limit), currentPage: page || 1, totalData: count } });
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
