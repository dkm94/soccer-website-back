const express = require("express");

const {
  createMod,
  getModbyId,
  deleteMod,
  isMod,
  isFeatured,
} = require("../controllers/AdminController");
const { auth, isAdmin, isAdminOrOwner, error } = require("../middlewares");

const router = express.Router();

router.post("/mods", auth, isAdmin, createMod, error);
router.put("/mods/mod/:id", auth, isAdmin, isMod, error);
router.put("/articles/featured/:id", auth, isAdmin, isFeatured, error);
router.get("/mods/:id", auth, isAdminOrOwner, getModbyId, error);
router.delete("/mods/:id", auth, isAdmin, deleteMod, error);

module.exports = router;
