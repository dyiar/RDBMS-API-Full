exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { id: 1, name: "Web14" },
        { id: 2, name: "Web15" },
        { id: 3, name: "Web16" }
      ]);
    });
};
