const { User } = require('../models');

class UserController {
  static async findAllCustomers(req, res, next) {
    try {
      const customers = await User.findAll({
        attributes: { exclude: ['password'] },
        where: {
          role: 'customer',
        },
      });
      res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
