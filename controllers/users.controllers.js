const { fetchUsers } = require("../models/users.models");

function getUsers(request, response) {
	return fetchUsers().then((users) => {
		response.status(200).send({ users });
	});
}

module.exports = { getUsers };
