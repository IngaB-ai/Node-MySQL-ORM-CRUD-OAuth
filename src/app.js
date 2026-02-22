
const express = require('express')
const app = express()
var cors = require('cors')

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

// Setup the server
const server = require('http').createServer(app)
server.listen(3000, () => {
  console.log('Server running on port', server.address().port)
})

// DB & ORM
const knexConfig = require('../knexfile')
const Knex = require('knex')
const { Model } = require('objection')
const knex = Knex(knexConfig.development)
Model.knex(knex)

// Create routes
const db = {
  Link: require('./models/Link')
}

app.get('/api/links', function (req, res, next) {
  db.Link.query()
    .select()
    .then(links => res.send(links))
    .catch(next)
})

app.get('/api/links/tags', function (req, res, next) {
  db.Link.query()
    .select()
    .then(links => {
      let tagArray = []
      for (var val of links) {
        tagArray.push(val.tag)
      }
      res.send(tagArray)
    })
    .catch(next)
})

function normalizeUrl (value) {
  if (!value) return value

  value = value.trim()

  if (!value.includes('://')) {
    value = 'https://' + value
  }

  try {
    return new URL(value).href
  } catch (err) {
    throw new Error('Invalid URL structure', { cause: 'ValidationError' })
  }
}

app.post('/api/links', function (req, res, next) {
  const title = req.body.title
  const link = normalizeUrl(req.body.link)
  const tag = req.body.tag
  db.Link.query()
    .insert({
      title: title,
      link: link,
      tag: tag
    })
    .then(persistedData => {
      const status = 201
      res.status(status).send(persistedData)
    })
    .catch(next)
})

app.delete('/api/links/:id', function (req, res, next) {
  db.Link.query()
    .delete()
    .where({ id: req.params.id })
    .then(() => res.send('Deleted successfully.'))
    .catch(next)
})

// Error handler
app.use((err, req, res, next) => {

  if (err) {
    res
      .status(err.statusCode || 500)
      .json({
        error:
          (err.type ? err.type : err.cause) + ': ' + err.message ||
          'An error occurred.'
      })
  }
})
