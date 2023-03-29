const express = require("express");

const { updatePassword, editProfile, getUser } = require("../controllers/CommonController");
const { auth, isOwner, isAdminOrOwner } = require("../middlewares");
const isAuthor = require("../middlewares/isAuthor");

const router = express.Router();

router.get("/users/:id", auth, isAdminOrOwner, getUser);
router.put("/users/edit/:id", auth, isOwner, updatePassword);
router.put("/users/profile/edit/:id", auth, isOwner, editProfile);

module.exports = router;