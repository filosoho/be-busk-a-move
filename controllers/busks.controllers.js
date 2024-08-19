const {selectBusks, addBusk} = require('../models/busks.models')

exports.getBusks = (req, res, next) => {
    selectBusks().then((busks) => {
        res.status(200).send({busks})
    })
};

exports.postBusk = (req, res, next) => {
 
    // const {busk_location, busk_location_name, busk_time,busk_date, username, user_image_url, busk_about_me, busk_setup} = req.body
    
    // if(!busk_location || !busk_location_name || !busk_time||!busk_date || !username || !user_image_url || !busk_about_me || !busk_setup)
    //     return Promise.reject({status: 404, message:'Bad request: missing required fields'})

    addBusk(req.body)
    .then(busk => {
        res.status(201).send({busk})
    })
    .catch(err => {
        next(err)
    })
};