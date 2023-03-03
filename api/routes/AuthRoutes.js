const express = require("express");

const { createAdmin, login, validateAccount } = require("../controllers/auth");

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", login);
router.put("/account/validation", validateAccount)

module.exports = router;