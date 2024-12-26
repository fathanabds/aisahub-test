const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const user = await User.create({ email, password, role });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: 'BadRequest', message: 'Email is required' };
      }
      if (!password) {
        throw { name: 'BadRequest', message: 'Password is required' };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: 'BadRequest', message: 'Invalid email or password' };
      }
      const isPasswordMatch = comparePassword(password, user.password);
      if (!isPasswordMatch) {
        throw { name: 'BadRequest', message: 'Invalid email or password' };
      }
      const access_token = signToken({ id: user.id, email: user.email });
      res.json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
