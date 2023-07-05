const auth = require("./auth");
const isAdmin = require("./isAdmin");
const isAdminOrOwner = require("./isAdminOrOwner");
const isOwner = require("./isOwner");
const isMod = require("./isMod");
const isAuthor = require("./isAuthor");
const error = require("./error");

module.exports = {
  auth,
  isAdmin,
  isAdminOrOwner,
  isOwner,
  isMod,
  isAuthor,
  error,
};
