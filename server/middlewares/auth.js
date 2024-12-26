const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
      throw { name: 'Unauthorized' };
    }
    const token = bearerHeader.split(' ')[1];
    if (!token) {
      throw { name: 'Unauthorized' };
    }
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: 'Unauthorized' };
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
