const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}

module.exports = { hashPassword, comparePassword };
