const express = require("express");

const { createMod, deactivateMod, getAllMods } = require("../controllers/AdminController");
const { adminAuth } = require("../middlewares");

const router = express.Router();

router.post("/mods", adminAuth, createMod);
router.put("/mods/:id", adminAuth, deactivateMod);
router.get("/mods/", adminAuth, getAllMods);

module.exports = router;