const express = require("express");
const {
	getUsers,
	getUserById,
	updateUserById,
} = require("../controllers/users.controllers");
const usersRouter = express.Router();

usersRouter.get("/", getUsers);

module.exports = usersRouter;
