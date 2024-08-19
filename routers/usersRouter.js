const express = require("express");
const {
	getUsers,
	getUserById,
	updateUserById,
} = require("../controllers/users.controllers");
const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:user_id", getUserById);

usersRouter.patch("/:user_id", updateUserById);

module.exports = usersRouter;
