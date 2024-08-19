const express = require("express");
const busksRouter = express.Router();
const {
  postBusk,
  getBusks,
  getBusksById,
} = require("../controllers/busks.controllers.js");

busksRouter.get("/", getBusks);
busksRouter.get("/:busk_id", getBusksById);
busksRouter.post("/", postBusk);

module.exports = busksRouter;
