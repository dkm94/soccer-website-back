const errorMessage = {
  empty: {
    success: false,
    message: "Please fill in all the fields",
    type: "empty",
  },
  passwordRegex: {
    success: false,
    message:
      "The password must contain 1 uppercase letter, a number, a special caracter and should be 6 to 50 characters long",
  },
  fail: { success: false, message: "Request has failed" },
  userNotFound: {
    auth: false,
    message: "User not found, please check your email",
    type: "incorrect",
    field: "email",
  },
  password: {
    auth: false,
    message: "Incorrect password, please check your credentials",
    type: "incorrect",
    field: "password",
  },
  confirmPassword: {
    auth: false,
    message: "Passwords should match, please check your credentials",
    type: "incorrect",
    field: "password",
  },
  unauthorized: {
    success: false,
    message: "You don't have permission to execute this action",
  },
  invalidUser: { success: false, message: "Invalid user" },
  token: { success: false, message: "Error token" },
  internalErrorServer: {
    success: false,
    message: "Something went wrong !",
    description: "Server error",
  },
  invalidValue: {
    success: false,
    message: "Data not found",
    description: "ID not valid",
  },
  notFound: {
    success: false,
    message: "Data not found",
  },
};

module.exports = function getError(type) {
  return errorMessage[type];
};
