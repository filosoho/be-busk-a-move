const db = require("../db/connection");

exports.selectBusks = () => {
  return db.query("SELECT * FROM busks;").then((result) => {
    return result.rows;
  });
};

exports.fetchBusksById = (busk_id) => {
  return db
    .query(`SELECT busks.* FROM busks WHERE busk_id = $1`, [busk_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
      return rows[0];
    });
};
