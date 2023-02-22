const express = require("express");

const { updateUser } = require("../controllers/CommonController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.put("/users/edit/:id", adminAuth, updateUser);

module.exports = router;