const { Store } = require('../models');

class StoreController {
  static async findAll(req, res, next) {
    try {
      const stores = await Store.findAll();
      res.status(200).json(stores);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = StoreController;
