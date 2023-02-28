const express = require("express");

const { updatePassword, editProfile, getUser, getProfile } = require("../controllers/CommonController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/users/:id", adminAuth, getUser);
router.get("/profiles/:id", adminAuth, getProfile);
router.put("/users/edit/:id", adminAuth, updatePassword);
router.put("/users/profile/edit/:id", adminAuth, editProfile);

module.exports = router;