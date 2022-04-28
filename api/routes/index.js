const express = require("express");
const mainRouter = express.Router();

const authRouter = require('./AuthRoutes');
const userRouter = require('./UserRoutes');

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;