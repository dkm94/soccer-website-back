const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, jwt_secret);
      const userId = decodedToken.id;
      res.locals.userId = userId;
      const isAdmin = decodedToken.isAdmin;
      res.locals.isAdmin = isAdmin;
      const profileId = decodedToken.profileId;
      res.locals.profileId = profileId;
      const isActive = decodedToken.isActive;
      res.locals.isActive = isActive;

      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json("token invalide");
    }
  };