exports.up = function (knex, Promise) {
  const schema = knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('email', 50).notNullable().unique()
    table.string('password', 255).nullable()
    table.string('salt', 255).nullable()
    table.string('google_id', 50).nullable().unique()
    table.string('username', 50).nullable().unique()
    table.string('avatar', 255).nullable()
    table.boolean('is_admin').defaultTo(false)
    table.boolean('is_private').defaultTo(false)
    table.timestamps(true, true)

    table.unique(['email'])
    table.unique(['google_id'])
    table.index(['email'])
  })
  return schema
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}