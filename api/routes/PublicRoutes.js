const express = require("express");
const router = express.Router();

const { getProfile, getProfiles, getAllArticles, getAllArticlesByProfile, getArticle, createComment, getCommentsByArticle, getCommentById, reportComment } = require("../controllers/PublicController");

router.get("/profiles/", getProfiles);
router.get("/profiles/:id", getProfile);
router.get("/articles/", getAllArticles);
router.get("/articles/author/:id", getAllArticlesByProfile);
router.get("/articles/:id", getArticle);
router.post("/articles/comments/add/:id", createComment);
router.get("/articles/comments/:id", getCommentsByArticle);
router.get("/comments/:id", getCommentById);

router.put("/comments/:id", reportComment);

module.exports = router;