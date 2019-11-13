
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string('username', 50).unique().notNullable();
      table.string('password', 20).notNullable();
      table.string('department').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
