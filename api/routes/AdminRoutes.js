const express = require("express");

const { createMod, isActive, getAllMods, getModbyId, deleteMod, isMod } = require("../controllers/AdminController");
const { auth, isAdmin, isAdminOrOwner } = require("../middlewares");

const router = express.Router();

router.post("/mods", auth, isAdmin, createMod);
router.put("/mods/active/:id", auth, isAdmin, isActive);
router.put("/mods/mod/:id", auth, isAdmin, isMod);
router.get("/mods/", auth, isAdmin, getAllMods);
router.get("/mods/:id", auth, isAdminOrOwner, getModbyId);
router.delete("/mods/:id", auth, isAdmin, deleteMod);

module.exports = router;