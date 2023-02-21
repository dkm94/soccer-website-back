const express = require("express");

const { users, user, updateUser, deleteAccount, create } = require("../controllers/UserController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/", adminAuth, users);
router.get("/myAccount/:id", adminAuth, user);
router.post("/editAccount/:id", adminAuth, updateUser);
router.delete("/deleteAccount/:id", adminAuth, deleteAccount);

module.exports = router;