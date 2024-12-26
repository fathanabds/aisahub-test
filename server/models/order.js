'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Store);
    }
  }
  Order.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Amount is required',
          },
          notNull: {
            msg: 'Amount is required',
          },
          min: {
            args: [1],
            msg: 'Amount must be greater than 0',
          },
        },
      },
      description: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'ordered',
        validate: {
          isIn: {
            args: [['ordered', 'delivered', 'inProgress']],
            msg: 'Status must be ordered, delivered, or inProgress',
          },
        },
      },
      UserId: DataTypes.INTEGER,
      StoreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
