const getError = require("./handleErrorMessages");

const handleValidationError = (err, res) => {
  // let errors = Object.values(err.errors).map((el) => {
  //   return el.message;
  // });
  // let fields = Object.values(err.errors).map((el) => el.path);
  // let code = 400;
  // if (errors.length > 1) {
  //   const formattedErrors = errors.join(" ");
  //   return res.status(code).send({ messages: formattedErrors, fields: fields });
  // } else {
  //   res.status(code).send({ messages: errors, fields: fields });
  // }

  // let errors = Object.values(err.errors).map((el) => {
  //   return el.message;
  // });
  // let fields = Object.values(err.errors).map((el) => el.path);
  // let code = 400;
  // res.status(code).send({ messages: errors, fields: fields });

  let errors = {};
  let code = 400;

  Object.keys(err.errors).forEach((key) => {
    errors[key] = err.errors[key].message;
  });
  return res.status(code).send({ messages: errors, error: getError("fail") });
};

module.exports = handleValidationError;
