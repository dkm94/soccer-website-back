const express = require("express");
const router = express.Router();

const { getAllArticles, getAllArticlesByProfile, getArticle } = require("../controllers/PublicController");

router.get("/articles/", getAllArticles);
router.get("/articles/author/:id", getAllArticlesByProfile);
router.get("/articles/:id", getArticle);

module.exports = router;