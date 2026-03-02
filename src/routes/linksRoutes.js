const router = require('express').Router()
const { normalizeUrl, extractTags } = require('../services/linkService')

const db = {
  Link: require('../databasePersistence/models/Link')
}

module.exports = function (app) {
  app.get('/api/links', function (req, res, next) {
    db.Link.query()
      .select()
      .then(links => res.send(links))
      .catch(next)
  })

  app.get('/api/links/tags', function (req, res, next) {
    db.Link.query()
      .select()
      .then(links => res.send(extractTags(links)))
      .catch(next)
  })

  app.post('/api/links', function (req, res, next) {
    const title = req.body.title
    const link = normalizeUrl(req.body.link)
    const tag = req.body.tag

    db.Link.query()
      .insert({ title, link, tag })
      .then(persistedData => res.status(201).send(persistedData))
      .catch(next)
  })

  app.delete('/api/links/:id', function (req, res, next) {
    db.Link.query()
      .delete()
      .where({ id: req.params.id })
      .then(() => res.send('Deleted successfully.'))
      .catch(next)
  })
}
