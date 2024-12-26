function isAdmin(req, res, next) {
  try {
    if (req.user.role === 'admin') {
      next();
    } else {
      throw { name: 'Forbidden' };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = isAdmin;
