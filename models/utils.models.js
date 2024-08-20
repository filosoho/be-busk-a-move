const db = require("../db/connection");

exports.checkIfBuskExists = (buskId) => {
  return db
    .query("SELECT * FROM busks WHERE busk_id = $1", [buskId])
    .then(({ rows }) => {
      return rows.length === 1;
    });
};
