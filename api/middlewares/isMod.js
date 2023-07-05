const getError = require("../utils/handleErrorMessages");

module.exports = (req, res, next) => {
  if (!res.locals.isMod) {
    res.status(401).send(getError("unauthorized"));
  } else {
    next();
  }
};
