const db = require("../db/connection");

function fetchUsers() {
	return db.query("SELECT * FROM users").then((response) => {
		return response.rows;
	});
}

module.exports = {
	fetchUsers,
};
