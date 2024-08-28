const express = require("express");
const busksRouter = express.Router();
const {
	postBusk,
	getBusks,
	getBusksById,
	deleteBusksById,
	patchBusksById,
} = require("../controllers/busks.controllers.js");

busksRouter.get("/", getBusks);
busksRouter.get("/:busk_id", getBusksById);
busksRouter.post("/", postBusk);
busksRouter.patch("/:busk_id", patchBusksById);
busksRouter.delete("/:busk_id", deleteBusksById);

module.exports = busksRouter;
