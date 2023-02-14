const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log("token", token)
      const decodedToken = jwt.verify(token, jwt_secret);
      const userId = decodedToken.id;
      res.locals.userId = userId;
      const admin = decodedToken.admin;
      res.locals.admin = admin;
      const profile = decodedToken.profile;
      res.locals.profile = profile;

      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json("token invalide");
    }
  };