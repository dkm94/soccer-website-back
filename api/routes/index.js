const express = require("express");
const mainRouter = express.Router();

const authRouter = require('./AuthRoutes');
const userRouter = require('./UserRoutes');
const adminRouter = require('./AdminRoutes');
const commonRouter = require('./CommonRoutes');

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/common", commonRouter);

module.exports = mainRouter;