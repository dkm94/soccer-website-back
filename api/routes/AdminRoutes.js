const express = require("express");

const { createMod, isActive, getAllMods, getModbyId, deleteMod } = require("../controllers/AdminController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/mods", adminAuth, createMod);
router.put("/mods/:id", adminAuth, isActive);
router.get("/mods/", adminAuth, getAllMods);
router.get("/mods/:id", adminAuth, getModbyId);
router.delete("/mods/:id", adminAuth, deleteMod);

module.exports = router;