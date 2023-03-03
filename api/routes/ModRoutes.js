const express = require("express");
const { getReportedComments, moderateComment, deleteComment } = require("../controllers/ModController");
const { auth } = require("../middlewares");
const router = express.Router();

router.get("/comments/reported/", auth, getReportedComments);
router.put("/comments/reported/:id", auth, moderateComment);
router.delete("/comments/delete/:id", auth, deleteComment);

module.exports = router;