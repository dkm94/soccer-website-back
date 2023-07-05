const express = require("express");
const router = express.Router();

const {
  getUsers,
  getProfile,
  getProfiles,
  getAllArticles,
  getAllArticlesByProfile,
  getArticle,
  getLastArticles,
  activateAccount
  // createComment,
  // getCommentsByArticle,
  // getCommentById,
  // reportComment,
} = require("../controllers/PublicController");
const { error } = require("../middlewares");

router.get("/users/", getUsers, error);
router.get("/profiles/", getProfiles, error);
router.get("/profiles/:id", getProfile, error);
router.get("/articles/", getAllArticles, error);
router.get("/articles/last/", getLastArticles, error);
router.get("/articles/author/:id", getAllArticlesByProfile, error);
router.get("/articles/:id", getArticle, error);
router.put("/users/edit/:id", activateAccount, error);
// router.post("/articles/comments/add/:id", createComment, error);
// router.get("/articles/comments/:id", getCommentsByArticle, error);
// router.get("/comments/:id", getCommentById, error);
// router.put("/comments/:id", reportComment, error);

module.exports = router;
