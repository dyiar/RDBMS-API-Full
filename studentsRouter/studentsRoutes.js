const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const router = express.Router();

//middleware

function checkIdExists(req, res, next) {
  db("students")
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
  db("students")
    .insert(req.body)
    .then(ids => {
      db("students")
        .where({ id: ids[0] })
        .then(newStudent => {
          res.status(201).send({ newStudent });
        });
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).send({ students });
    })
    .catch(() =>
      res.status(500).send({ error: "The data could not be retrieved." })
    );
});

router.get("/:id", checkIdExists, (req, res) => {
    const id = req.params.id

    db.select("students.id", "students.name", "cohorts.name as cohort").from('students').innerJoin('cohorts', 'cohorts.id', '=', 'students.cohort_id').where('students.id', id).then(response => {
        res.status(200).json({ response })
    })
    .catch(() => res.status(500).send({ error: "The data couldn't be retrieved." }))

    // let data = await db.select("students.id", "students.name", "cohorts.name as cohort").from('students').innerJoin('cohorts', 'cohorts.id', '=', 'students.cohort_id').where('students.id', id);


    // try {


    //     if (data.length) {
    //         res.status(200).json({ data });
    //     } 

    //     res.status(404).send({ error: 'student error'})

    // }

    // catch (err) {
    // res.status(500).send({ error: "The data could not be retrieved." })
    // };
});

router.put("/:id", checkIdExists, (req, res) => {
  const changes = req.body;

  db("students")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).send({ count });
    })
    .catch(() => res.status(500).send({ error: "Data could not be saved." }));
});

router.delete("/:id", checkIdExists, (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).send({ count });
    })
    .catch(() => res.send(500).send({ error: "Data could not be deleted." }));
});



module.exports = router;
