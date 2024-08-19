const express = require('express')
const apiRouter = express.Router()
const busksRouter = require('./busksRouter')

apiRouter.use('/busks', busksRouter)
//apiRouter.use('/user', )

module.exports = apiRouter;