exports.up = function(knex, Promise) {
  // make changes to our database

  return knex.schema.createTable("cohorts", function(tbl) {
    tbl.increments();

    tbl.text("name", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // rollback/undo changes to database
  return knex.schema.dropTableIfExists("cohorts");
};
