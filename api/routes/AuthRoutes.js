const express = require("express");

const { createAdmin, login } = require("../controllers/auth");

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", login);

module.exports = router;