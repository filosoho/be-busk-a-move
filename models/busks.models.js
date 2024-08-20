const db = require("../db/connection");
const { checkIfBuskExists } = require("./utils.models");

exports.selectBusks = (sortBy = "busk_time_date") => {

  const greenList = [
    "username",
    "busk_location_name",
    "user_image_url",
    "busk_time_date",
    "busk_date"
  ]

  if (!greenList.includes(sortBy)) {
      return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let sqlQuery = `SELECT * FROM busks `
  sqlQuery += `ORDER BY ${sortBy} DESC`

  return db.query(sqlQuery).then(({rows}) => {
    return rows;
  });
};

exports.fetchBusksById = (busk_id) => {
  return db
    .query(`SELECT busks.* FROM busks WHERE busk_id = $1`, [busk_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Busk does not exist" });
      }
      return rows[0];
    });
};

exports.addBusk = (newBusk) => {
  const {
    busk_location,
    busk_location_name,
    busk_time_date,
    username,
    user_image_url,
    busk_about_me,
    busk_setup,
  } = newBusk;

  const query = `
  INSERT INTO busks(busk_location, busk_location_name, busk_time_date, username, user_image_url, busk_about_me, busk_setup)
  VALUES($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;`;

  const values = [
    busk_location,
    busk_location_name,
    busk_time_date,
    username,
    user_image_url,
    busk_about_me,
    busk_setup,
  ];

  return db
    .query(query, [
      busk_location,
      busk_location_name,
      busk_time_date,
      username,
      user_image_url,
      busk_about_me,
      busk_setup,
    ])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

exports.removeBusksById = (buskId) => {
  return checkIfBuskExists(buskId)
    .then((exists) => {
      if (!exists) {
        return Promise.reject({ status: 404, msg: "Busk not found" });
      } else {
        return db
          .query("DELETE FROM busks WHERE busk_id = $1", [buskId])
          .then((result) => {
            if (result.rowCount === 0) {
              return Promise.reject({ status: 404, msg: "Busk not found" });
            }
          });
      }
    })
    .catch((err) => {
      console.error("Error in removeBusksById:", err);
      throw err;
    });
};
