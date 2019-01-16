exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(tbl) {
    tbl.increments();

    tbl.text("name", 255).notNullable();

    tbl
      .integer("cohort_id")
      .unsigned()
      .notNullable();
    tbl.foreign("cohort_id").references("cohorts.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
