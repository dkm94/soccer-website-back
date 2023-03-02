const express = require("express");
const { getReportedComments, moderateComment, deleteComment } = require("../controllers/ModController");
const { adminAuth } = require("../middlewares");
const router = express.Router();

router.get("/comments/reported/", adminAuth, getReportedComments);
router.put("/comments/reported/:id", adminAuth, moderateComment);
router.delete("/comments/delete/:id", adminAuth, deleteComment);

module.exports = router;