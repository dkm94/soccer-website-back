const getError = require("../utils/handleErrorMessages");

module.exports = (req, res, next) => {
  if (res.locals.profileId != req.params.id) {
    res.status(401).send(getError("unauthorized"));
    res.status(401).send(res.locals.profileId, req.params.id);
    return;
  } else {
    next();
  }
};
