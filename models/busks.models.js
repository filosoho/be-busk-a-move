const db = require("../db/connection");
const { checkInstrumentExists } = require("../utils/checkInstrumentExists");
const { checkIfBuskExists } = require("./utils.models");

exports.selectBusks = (sortBy = "busk_time_date", order = "desc", instrument = undefined) => {
  console.log(sortBy, "    ", order, "     ", instrument, "<<< ")
  const greenList = [
    "username",
    "busk_location_name",
    "user_image_url",
    "busk_time_date",
    "busk_selected_instruments",
  ];

  if (!greenList.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let sqlQuery = `SELECT * FROM busks `

  if(instrument) {
    return checkInstrumentExists(instrument)
    .then((result) => {
      if (result === false) {
        return Promise.reject({ status: 400, msg: "Bad request" })
      } else {
        sqlQuery += `ORDER BY ${sortBy} `
        if (order === "asc") {
          sqlQuery += `ASC`
        } else if (order === "desc") {
          sqlQuery += `DESC`
        } else if (order) {
          return Promise.reject({ status: 400, msg: "Bad request" })
        }
        return db.query(sqlQuery).then(({ rows }) => {
          const filteredBusks = rows.filter(busk => (busk.busk_selected_instruments.includes(instrument)))
          return filteredBusks
        })
      }
    })
  } else {
    sqlQuery += `ORDER BY ${sortBy} `
    if (order === "asc") {
      sqlQuery += `ASC`
    } else if (order === "desc") {
      sqlQuery += `DESC`
    } else if (order) {
      return Promise.reject({ status: 400, msg: "Bad request" })
    }
    return db.query(sqlQuery).then(({ rows }) => {
      return rows
    })
  }
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
    busk_selected_instruments,
  } = newBusk;

  const query = `
  INSERT INTO busks(busk_location, busk_location_name, busk_time_date, username, user_image_url, busk_about_me, busk_setup, busk_selected_instruments)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;`;

  const values = [
    busk_location,
    busk_location_name,
    busk_time_date,
    username,
    user_image_url,
    busk_about_me,
    busk_setup,
    busk_selected_instruments,
  ];

  return db
    .query(query, values)
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
      throw err;
    });
};
