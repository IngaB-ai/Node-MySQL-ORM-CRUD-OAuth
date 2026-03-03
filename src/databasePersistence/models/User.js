const { Model } = require('objection')

class User extends Model {
  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email', minLength: 3, maxLength: 50 },
        google_id: { type: 'string', maxLength: 50 },
        username: { type: 'string', minLength: 3, maxLength: 50 },
        avatar: { type: 'string', maxLength: 255 },
        password: { type: 'string', maxLength: 255 },
        salt: {
          type: 'string',
          maxLength: 255
        },
        is_admin: {
          type: 'boolean',
          default: false
        },
        is_private: {
          type: 'boolean',
          default: false
        }
      }
    }
  }
}

module.exports = User
