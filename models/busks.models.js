const db = require('../db/connection')

exports.selectBusks = () => {
    return db.query('SELECT * FROM busks;').then((result) => {
        return result.rows
    })
}

exports