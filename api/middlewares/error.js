const handleValidationError = require("../utils/handleValidationError");
const handleDuplicateKeyError = require("../utils/handleDuplicateKeyError");
const handleCastError = require("../utils/handleCastError");
const getError = require("../utils/handleErrorMessages")

module.exports = (err, req, res, next) => {
  try {
    if (err.name === "ValidationError") {
      return (err = handleValidationError(err, res));
    }
    if (err.name === "CastError") {
      return (err = handleCastError(err, res));
    }
    if (err.code && err.code == 11000)
      return (err = handleDuplicateKeyError(err, res));
  } catch (err) {
    res.status(500).send(getError("internalErrorServer"));
  }
};
