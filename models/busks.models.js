const db = require("../db/connection");

exports.selectBusks = () => {
  return db.query("SELECT * FROM busks;").then((result) => {
    return result.rows;
  });
};

<<<<<<< HEAD
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
=======
exports
>>>>>>> 79601c3d91da1364bcc1346cd2b6528665ae6d4d
