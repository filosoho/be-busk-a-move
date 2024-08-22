const db = require("../db/connection")

exports.checkInstrumentExists = (instrument) => {
    let sqlString =
    `SELECT busk_selected_instruments FROM busks`
    return db.query(sqlString)
    .then(({rows}) => {
        const filteredBusks = rows.map((busk) => {
            if(busk.busk_selected_instruments.includes(instrument)) {
                return Promise.resolve(true)
            }
            return Promise.resolve(false)
        })
        return Promise.all(filteredBusks)
        .then((isThereInstruments) => {
            if(isThereInstruments.includes(true)) {
                return true
            }
            return false
        })
    })
}