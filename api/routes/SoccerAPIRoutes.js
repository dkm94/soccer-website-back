const express = require("express");
const router = express.Router();

const { getMatchesOfTheDay, getCompetitions, getScoreBoard, getHistoryMatches } = require("../controllers/SoccerAPIController");

router.get("/matches/", getMatchesOfTheDay);
router.get("/competitions/", getCompetitions);
router.get("/scoreboard/:code", getScoreBoard);
router.get("/matches/history/:dateFrom/:dateTo", getHistoryMatches);

module.exports = router;
