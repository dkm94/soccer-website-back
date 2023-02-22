const express = require("express");

const { updatePassword } = require("../controllers/CommonController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.put("/users/edit/:id", adminAuth, updatePassword);

module.exports = router;