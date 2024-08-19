const db = require('../db/connection')

exports.selectBusks = () => {
    return db.query('SELECT * FROM busks;').then((result) => {
        return result.rows
    })
}

exports.addBusk = (busk_location, busk_location_name, busk_time, username, user_image_url, busk_about_me, busk_setup) => {
    if(!busk_location || !busk_location_name || !busk_time || !username || !user_image_url || !busk_about_me || !busk_setup) {
        return Promise.reject({status: 400, message: 'missing required fields'})
    }

    const query = `
    INSERT INTO busks(busk_location, busk_location_name, busk_time, username, user_image_url, busk_about_me, busk_setup)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`

    const values = [busk_location, busk_location_name, busk_time, username, user_image_url, busk_about_me, busk_setup]
    return db.query(query,values)
    .then((result) => {
        return result.rows[0]
    })
    .catch((err) => {
        throw err
    })
}