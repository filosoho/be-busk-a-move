const db = require("../db/connection");

function fetchUsers() {
	return db.query("SELECT * FROM users").then((response) => {
		return response.rows;
	});
}

function fetchUserById(userId) {
	return db
		.query(`SELECT users.* FROM users WHERE users_id = $1`, [userId])
		.then((response) => {
			if (response.rows.length === 0) {
				return Promise.reject({ status: 404, msg: "user does not exist" });
			}
			return response.rows[0];
		});
}

module.exports = {
	fetchUsers,
	fetchUserById,
};
