const express = require("express");

const { updatePassword, editProfile, getUser, getProfile, createArticle, editArticle, deleteArticle, getReportedComments } = require("../controllers/CommonController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.get("/users/:id", adminAuth, getUser);
router.get("/profiles/:id", adminAuth, getProfile);
router.put("/users/edit/:id", adminAuth, updatePassword);
router.put("/users/profile/edit/:id", adminAuth, editProfile);

router.post("/articles", adminAuth, createArticle);
router.put("/articles/edit/:id", adminAuth, editArticle);
router.delete("/articles/delete/:id", adminAuth, deleteArticle);

module.exports = router;