const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET
router.get('/', (req, res) => {
  // Grabs notes that container the users ID
  const id = req.body.id;
  console.log('this is the ID', id);
  const queryText = `SELECT * FROM "notes" WHERE "user_id"=$1;`;
  pool.query(queryText, [id]).then((result) => {
      console.log('result from GET', result.rows);
      res.send(result.rows);
  }).catch((error) => {
      console.log('error in GET notes', error);
      res.sendStatus(500);
  })
});

// POST
router.post('/note', (req, res) => {
    // Creates a note
    console.log('this is the req.body', req.body);
    const user_id = req.body.user_id;
    const car_id = req.body.car_id;
    const type = "note";
    const priority = req.body.priority;
    const text = req.body.text;
    const queryText = `INSERT INTO "notes" ("user_id", "car_id", "type", "priority", "text")
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [user_id, car_id, type, priority, text])
    .then((result) => {
        console.log('POST successful to notes table', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error POSTing to notes table', error);
        res.sendStatus(500);
    })
});

router.post('/problem', (req, res) => {
    // Creates a problem
    console.log('this is the req.body', req.body);
    const user_id = req.body.user_id;
    const car_id = req.body.car_id;
    const type = "problem";
    const priority = req.body.priority;
    const problem = req.body.problem;
    const solution = req.body.solution
    const queryText = `INSERT INTO "notes" ("user_id", "car_id", "type", "priority", "problem", "solution")
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [user_id, car_id, type, priority, problem, solution])
    .then((result) => {
        console.log('POST successful to notes table "problems"', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error POSTing to notes table "problems"', error);
        res.sendStatus(500);
    })
});

module.exports = router;
