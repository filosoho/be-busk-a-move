const express = require('express')
const busksRouter = express.Router()
const {postBusk, getBusks} = require('../controllers/busks.controllers.js')

busksRouter.get('/', getBusks)
busksRouter.post('/', postBusk)

module.exports = busksRouter;