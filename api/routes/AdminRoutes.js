const express = require("express");

const { createMod, isActive, getAllMods, getModbyId, deleteMod, isMod } = require("../controllers/AdminController");
const { adminAuth, isAdmin, isAdminOrOwner } = require("../middlewares");

const router = express.Router();

router.post("/mods", adminAuth, isAdmin, createMod);
router.put("/mods/active/:id", adminAuth, isAdmin, isActive);
router.put("/mods/mod/:id", adminAuth, isAdmin, isMod);
router.get("/mods/", adminAuth, isAdmin, getAllMods);
router.get("/mods/:id", adminAuth, isAdminOrOwner, getModbyId);
router.delete("/mods/:id", adminAuth, isAdmin, deleteMod);

module.exports = router;