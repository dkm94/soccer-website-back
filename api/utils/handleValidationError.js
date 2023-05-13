const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => {
    return el.message;
  });
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(" ");
    return res.status(code).send({ messages: formattedErrors, fields: fields });
  } else {
    res.status(code).send({ messages: errors, fields: fields });
  }
};

module.exports = handleValidationError;
