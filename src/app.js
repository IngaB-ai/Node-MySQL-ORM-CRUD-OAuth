const express = require('express')
const app = express()
// var cors = require('cors')

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}
app.use(allowCrossDomain)

app.use(express.json()) // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true,
    limit: '1mb',
    parameterLimit: 500
  })
)

// DB & ORM
const knexConfig = require('./databasePersistence/knexfile')
const Knex = require('knex')
const { Model } = require('objection')
const knex = Knex(knexConfig.development)
Model.knex(knex)

require('./routes/linksRoutes')(app)

// Error handler
app.use((err, req, res, next) => {
  console.log('err: ', err)

  if (err) {
    res.status(err.statusCode || 500).json({
      error:
        (err.type ? err.type : err.cause) + ': ' + err.message ||
        'An error occurred.'
    })
  }
})

module.exports = app
