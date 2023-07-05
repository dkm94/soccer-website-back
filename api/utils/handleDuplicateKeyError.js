const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `Oops, an account with that ${field} already exists.`;
  res.status(code).send({ messages: error, fields: field });
};

module.exports = handleDuplicateKeyError;
