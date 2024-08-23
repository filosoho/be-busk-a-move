const express = require("express");
const {
	getUsers,
	getUserById,
	updateUserById,
	deleteUser,
	postUser,
} = require("../controllers/users.controllers");
const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.post("/", postUser);

usersRouter.get("/:user_id", getUserById);

usersRouter.patch("/:user_id", updateUserById);

usersRouter.delete("/:user_id", deleteUser);

module.exports = usersRouter;
