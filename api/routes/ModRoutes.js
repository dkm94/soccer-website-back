const express = require("express");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "api/uploads/articles" });
const { auth, isMod, isAuthor } = require("../middlewares");

const {
  getReportedComments,
  moderateComment,
  deleteComment,
  createArticle,
  editArticle,
  deleteArticle,
} = require("../controllers/ModController");

const router = express.Router();

router.get("/comments/reported/", auth, isMod, getReportedComments);
router.put("/comments/reported/:id", auth, isMod, moderateComment);
router.delete("/comments/delete/:id", auth, isMod, deleteComment);

router.post(
  "/articles/create",
  auth,
  isMod,
  uploadMiddleware.single("file"),
  createArticle
);
router.put("/articles/edit/:id", auth, isAuthor, editArticle);
router.delete("/articles/delete/:id", auth, isAuthor, deleteArticle);

module.exports = router;
