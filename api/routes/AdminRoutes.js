const express = require("express");

const { createMod, isActive, getAllMods, getModbyId, deleteMod, isMod } = require("../controllers/AdminController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/mods", adminAuth, createMod);
router.put("/mods/active/:id", adminAuth, isActive);
router.put("/mods/mod/:id", adminAuth, isMod);
router.get("/mods/", adminAuth, getAllMods);
router.get("/mods/:id", adminAuth, getModbyId);
router.delete("/mods/:id", adminAuth, deleteMod);

module.exports = router;