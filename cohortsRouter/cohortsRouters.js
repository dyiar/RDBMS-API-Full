const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const router = express.Router();

//middleware

function checkIdExists(req, res, next) {
  db("cohorts")
    .where({ id: req.params.id })
    .then(count => {
      if (count.length > 0) {
        next();
      } else {
        res.status(404).send({ error: "The ID doesn't exist." });
      }
    });
}

// endpoints

router.post("/", (req, res) => {
  db("cohorts")
    .insert(req.body)
    .then(ids => {
      db("cohorts")
        .where({ id: ids[0] })
        .then(newCohort => {
          res.status(201).send({ newCohort });
        });
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).send({ cohorts });
    })
    .catch(() =>
      res.status(500).send({ error: "The data could not be retrieved." })
    );
});

router.get("/:id", checkIdExists, (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohort => {
      res.status(200).send({ cohort });
    })
    .catch(() =>
      res.status(500).send({ error: "The data could not be retrieved." })
    );
});

router.get("/:id/students", checkIdExists, (req, res) => {
  db("students")
    .where({ cohort_id: req.params.id })
    .then(students => {
      res.status(200).send({ students });
    })
    .catch(() =>
      res.status(500).send({ error: "Data could not be retrieved." })
    );
});

router.put("/:id", checkIdExists, (req, res) => {
  const changes = req.body;

  db("cohorts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).send({ count });
    })
    .catch(() => res.status(500).send({ error: "Data could not be saved." }));
});

router.delete("/:id", checkIdExists, (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).send({ count });
    })
    .catch(() => res.send(500).send({ error: "Data could not be deleted." }));
});

module.exports = router;
