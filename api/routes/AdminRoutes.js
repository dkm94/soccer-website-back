const express = require("express");

const { createMod, getModbyId, deleteMod, isMod } = require("../controllers/AdminController");
const { auth, isAdmin, isAdminOrOwner } = require("../middlewares");

const router = express.Router();

router.post("/mods", auth, isAdmin, createMod);
router.put("/mods/mod/:id", auth, isAdmin, isMod);
router.get("/mods/:id", auth, isAdminOrOwner, getModbyId);
router.delete("/mods/:id", auth, isAdmin, deleteMod);

module.exports = router;