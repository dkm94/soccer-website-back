const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;
const getError = require("../../utils");

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, jwt_secret);
      const { id, isAdmin, profileId, accountValidated } = decodedToken;
      res.locals.userId = id;
      res.locals.isAdmin = isAdmin;
      res.locals.profileId = profileId;
      res.locals.accountValidated = accountValidated;

      if (id && id !== res.locals.userId) {
        throw getError("invalidUser");
      } else {
        next();
      }
    } catch {
      res.status(401).json(getError("token"));
    }
  };