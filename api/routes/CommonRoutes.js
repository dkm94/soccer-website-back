const express = require("express");

const { updatePassword, editProfile, getUser, getProfile, createArticle, editArticle, deleteArticle } = require("../controllers/CommonController");
const { auth, isOwner, isMod, isAdminOrOwner } = require("../middlewares");
const isAuthor = require("../middlewares/isAuthor");

const router = express.Router();

router.get("/users/:id", auth, isAdminOrOwner, getUser);
router.get("/profiles/:id", auth, isAdminOrOwner, getProfile);
router.put("/users/edit/:id", auth, isOwner, updatePassword);
router.put("/users/profile/edit/:id", auth, isOwner, editProfile);

router.post("/articles", auth, isMod, createArticle);
router.put("/articles/edit/:id", auth, isAuthor, editArticle);
router.delete("/articles/delete/:id", auth, isAuthor, deleteArticle);

module.exports = router;