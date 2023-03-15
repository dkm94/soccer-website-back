const express = require("express");
const { getReportedComments, moderateComment, deleteComment, createArticle, editArticle, deleteArticle } = require("../controllers/ModController");
const { auth, isMod, isAuthor } = require("../middlewares");
const router = express.Router();

router.get("/comments/reported/", auth, isMod, getReportedComments);
router.put("/comments/reported/:id", auth, isMod, moderateComment);
router.delete("/comments/delete/:id", auth, isMod, deleteComment);

router.post("/articles", auth, isMod, createArticle);
router.put("/articles/edit/:id", auth, isAuthor, editArticle);
router.delete("/articles/delete/:id", auth, isAuthor, deleteArticle);

module.exports = router;