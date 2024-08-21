const express = require("express");
const apiRouter = express.Router();
const { getEndpoints } = require("../controllers/endpoints.controllers");
const busksRouter = require("./busksRouter");
const usersRouter = require("./usersRouter");

apiRouter.route("/").get(getEndpoints);

apiRouter.use("/busks", busksRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
