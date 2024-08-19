const { fetchUsers, fetchUserById } = require("../models/users.models");

function getUsers(request, response) {
	return fetchUsers().then((users) => {
		response.status(200).send({ users });
	});
}

function getUserById(request, response, next) {
	const userId = request.params.user_id;
	return fetchUserById(userId)
		.then((user) => {
			response.status(200).send(user);
		})
		.catch((error) => {
			next(error);
		});
}

module.exports = { getUsers, getUserById };
