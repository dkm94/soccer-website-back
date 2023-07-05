const getError = require("../utils/handleErrorMessages");

const handleCastError = (err, res) => {
  let code = 404;
  res.status(code).send(getError("invalidValue"));
};

module.exports = handleCastError;
