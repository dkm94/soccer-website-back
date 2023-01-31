const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, jwt_secret);
      const userId = decodedToken.id;
      res.locals.userId = userId;
      const alias = decodedToken.alias;
      res.locals.alias = alias;
      const competitions = decodedToken.competitions;
      res.locals.competitions = competitions;
      
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json("token invalide");
    }
  };