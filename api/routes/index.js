const express = require("express");
const mainRouter = express.Router();

const authRouter = require('./AuthRoutes');
const adminRouter = require('./AdminRoutes');
const commonRouter = require('./CommonRoutes');
const publicRouter = require('./PublicRoutes');
const modRouter = require('./ModRoutes');
const soccerAPIRouter = require("./SoccerAPIRoutes");

mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/common", commonRouter);
mainRouter.use("/public", publicRouter);
mainRouter.use("/mod", modRouter);
mainRouter.use("/api/soccer", soccerAPIRouter);

module.exports = mainRouter;