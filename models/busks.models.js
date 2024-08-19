const db = require('../db/connection')

exports.selectBusks = () => {
    return db.query('SELECT * FROM busks;').then((result) => {
        return result.rows
    })
}

exports.addBusk = (newBusk) => {
    // if(!busk_location || !busk_location_name || !busk_time || !busk_date || !username || !user_image_url || !busk_about_me || !busk_setup) {
    //     return Promise.reject({status: 400, message: 'missing dsvgfsgrfgergerg fields'})
    // }

    const {busk_location, busk_location_name, busk_time, busk_date, username, user_image_url, busk_about_me, busk_setup} = newBusk



     
    const query = `
    INSERT INTO busks(busk_location, busk_location_name, busk_time,busk_date, username, user_image_url, busk_about_me, busk_setup)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;`

  

    const values = [busk_location, busk_location_name, busk_time, busk_date, username, user_image_url, busk_about_me, busk_setup]

   
    return db.query(query,[busk_location, busk_location_name, busk_time, busk_date, username, user_image_url, busk_about_me, busk_setup])
    .then((result) => {
        console.log(result, '<<< result in the model')
        return result.rows[0]
    })
    .catch((err) => {
        throw err
    })
}