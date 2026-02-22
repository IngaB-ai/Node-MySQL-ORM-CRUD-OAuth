const { Model } = require('objection')

class Link extends Model {
  static get tableName () {
    return 'links'
  }
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'link'],
      properties: {
        id: { type: 'integer' },
        title: {
          type: 'string',
          minLength: 3,
          maxLength: 255
        },
        link: {
          type: 'string',
          format: 'uri-reference',
          maxLength: 500
        },
        tag: {
          type: 'string',
          maxLength: 50
        },
        vote: {
          type: 'integer',
          default: 0,
          minimum: 0,
          maximum: 5
        },
      }
    }
  }
}
module.exports = Link




