
// DB & ORM
const knexConfig = require('./knexfile')
const Knex = require('knex')
const { Model } = require('objection')
const db = Knex(knexConfig[process.env.NODE_ENV || 'development'])
Model.knex(db)

module.exports = db;
