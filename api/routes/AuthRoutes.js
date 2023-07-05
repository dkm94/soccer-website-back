const express = require("express");

const { createAdmin, login, validateAccount } = require("../controllers/auth");
const { error } = require("../middlewares");

const router = express.Router();

router.post("/register", createAdmin, error);
router.post("/login", login, error);
router.put("/account/validation", validateAccount, error)

module.exports = router;