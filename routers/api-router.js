const express = require("express");
const apiRouter = express.Router();
const busksRouter = require("./busksRouter");
const usersRouter = require("./usersRouter");

apiRouter.use("/busks", busksRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
