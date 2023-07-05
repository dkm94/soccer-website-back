const express = require("express");
// const multer = require("multer");
// const uploadMiddleware = multer({ dest: "api/uploads/profiles" });

const {
  updatePassword,
  editProfile,
  getUser,
} = require("../controllers/CommonController");
const { auth, isOwner, isAdminOrOwner, error } = require("../middlewares");

const router = express.Router();

router.get("/users/:id", auth, isAdminOrOwner, getUser, error);
router.put("/users/edit/:id", auth, updatePassword, error);
// update user (first connection, password + acc activation)

router.put("/users/profile/edit/:id", auth, isOwner, editProfile, error);

module.exports = router;
