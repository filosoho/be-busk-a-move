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

function updateUser(user_id, location) {
	return db
		.query(
			"UPDATE users SET user_location = $2 WHERE users.users_id = $1 RETURNING *",
			[user_id, location]
		)
		.then((response) => {
			if (response.rows.length === 0) {
				return Promise.reject({ status: 404, msg: "user does not exist" });
			}
			return response.rows[0];
		});
}

function removeUser(user_id) {
	return db
		.query("DELETE FROM users WHERE users_id = $1 RETURNING *", [user_id])
		.then((response) => {
			console.log(response.rows);
			if (response.rows.length === 0) {
				return Promise.reject({ status: 404, msg: "user does not exist" });
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

module.exports = {
	fetchUsers,
	fetchUserById,
	updateUser,
	removeUser,
};
