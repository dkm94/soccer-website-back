const express = require("express");
const mainRouter = express.Router();

const authRouter = require('./AuthRoutes');
const userRouter = require('./UserRoutes');
const adminRouter = require('./AdminRoutes');

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/admin", adminRouter);

module.exports = mainRouter;