const express = require("express");

const { deleteAccount } = require("../controllers/UserController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.delete("/deleteAccount/:id", adminAuth, deleteAccount);

module.exports = router;