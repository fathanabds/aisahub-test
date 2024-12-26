function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequlizeUniqueConstraintError':
      return res.status(400).json({ message: err.errors[0].message });
    case 'Unauthorized':
    case 'JsonWebTokenError':
      return res.status(401).json({ message: 'Invalid token' });
    case 'BadRequest':
      return res.status(400).json({ message: err.message });
    case 'Forbidden':
      return res.status(403).json({ message: 'You have no access' });
    case 'NotFound':
      return res.status(404).json({ message: 'Order not found' });
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
}

module.exports = errorHandler;
