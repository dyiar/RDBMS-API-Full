exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "Adam Hinckley", cohort_id: 1 },
        { id: 2, name: "Andre Myrick", cohort_id: 1 },
        { id: 3, name: "Angelo Deleon", cohort_id: 1 },
        { id: 4, name: "Addison Stavlo", cohort_id: 2 },
        { id: 5, name: "Austin Blake", cohort_id: 2 },
        { id: 6, name: "Ben Tsao", cohort_id: 2 },
        { id: 7, name: "Alex King", cohort_id: 3 },
        { id: 8, name: "Amber Meador", cohort_id: 3 },
        { id: 9, name: "Angel Torres", cohort_id: 3 }
      ]);
    });
};
