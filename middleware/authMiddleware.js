const protect = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: 'Необходимо авторизоваться' });
    }
  };
  
  module.exports = protect;