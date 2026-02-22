exports.up = function (knex, Promise) {
  const schema = knex.schema.createTable('links', function (table) {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.string('link', 500).notNullable()
    table.string('tag', 50)
    table.integer('vote').defaultTo(0)
    table.timestamps(true, true), 
    table.integer('version').defaultTo(1).notNullable();

    table.index(['vote'])
    table.index(['tag'])
    table.unique(['link'])
  })
  return schema
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('links')
}
