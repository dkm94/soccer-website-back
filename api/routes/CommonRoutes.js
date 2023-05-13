const express = require("express");

const {
  updatePassword,
  editProfile,
  getUser,
} = require("../controllers/CommonController");
const { auth, isOwner, isAdminOrOwner, error } = require("../middlewares");

const router = express.Router();

router.get("/users/:id", auth, isAdminOrOwner, getUser, error);
router.put("/users/edit/:id", auth, isOwner, updatePassword, error);
router.put("/users/profile/edit/:id", auth, isOwner, editProfile, error);

module.exports = router;
