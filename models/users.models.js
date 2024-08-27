const db = require("../db/connection");

function fetchUsers() {
  return db.query("SELECT * FROM users").then((response) => {
    return response.rows;
  });
}

function addUser(newUser) {
  let sqlQuery = `INSERT INTO users (username, full_name, user_email, user_password, user_image_url, user_location, user_about_me, instruments)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *`;

  const values = [
    newUser.username,
    newUser.full_name,
    newUser.user_email,
    newUser.user_password,
    newUser.user_image_url,
    newUser.user_location,
    newUser.user_about_me,
    newUser.instruments,
  ];
  return db.query(sqlQuery, values).then(({ rows }) => {
    return rows[0];
  });
}

function fetchUserById(userId) {
  return db
    .query(`SELECT users.* FROM users WHERE user_id = $1`, [userId])
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
      "UPDATE users SET user_location = $2 WHERE users.user_id = $1 RETURNING *",
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
    .query("DELETE FROM users WHERE user_id = $1 RETURNING *", [user_id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "user does not exist" });
      }
    });
}

module.exports = {
  fetchUsers,
  addUser,
  fetchUserById,
  updateUser,
  removeUser,
};
