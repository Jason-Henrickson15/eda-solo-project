const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET
router.get('/', rejectUnauthenticated, (req, res) => {
    // Grabs notes that container the users ID
    console.log('this should be the user', req.user);
    const user_id = req.user.id;
    const queryText = `SELECT * FROM "notes" WHERE "user_id"=$1;`;
    pool.query(queryText, [user_id]).then((result) => {
        console.log('result from GET', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET notes', error);
        res.sendStatus(500);
    });
});

router.get('/:car_id', rejectUnauthenticated, (req, res) => {
    // Grabs all notes that match the chosen vehicle
    const user_id = req.user.id;
    const car_id = req.params.car_id;
    const queryText = `SELECT * FROM "notes" WHERE "user_id"=$1 AND "car_id"=$2;`;
    pool.query(queryText, [user_id, car_id]).then((result) => {
        console.log('result from GET carID', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR getting chosen notes', error);
        res.sendStatus(500);
    });
});

router.get('/details/:id', rejectUnauthenticated, (req,res) => {
    // Grabs the note with matching id to display details
    console.log('this is the noteID', req.params.id);
    const note_id = req.params.id;
    const user_id = req.user.id;
    const queryText =  `SELECT * FROM "notes" WHERE "user_id"=$1 AND "id"=$2;`;
    pool.query(queryText, [user_id, note_id]).then((result) => {
        console.log('result from GET note details', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR getting note details', error);
        res.sendStatus(500);
    });
});

// POST
router.post('/note', rejectUnauthenticated, (req, res) => {
    // Creates a note
    console.log('this is the req.body', req.body);
    const user_id = req.user.id;
    const car_id = req.body.car_id;
    const type = "note";
    const priority = req.body.priority;
    const title = req.body.title;
    const text = req.body.text;
    const solved = req.body.solved;
    const queryText = `INSERT INTO "notes" ("user_id", "car_id", "type", "priority", "title", "text", "solved")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [user_id, car_id, type, priority, title, text, solved])
        .then((result) => {
            console.log('POST successful to notes table', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error POSTing to notes table', error);
            res.sendStatus(500);
        })
});

router.post('/problem', rejectUnauthenticated, (req, res) => {
    // Creates a problem
    console.log('this is the req.body', req.body);
    const user_id = req.user.id;
    const car_id = req.body.car_id;
    const type = "problem";
    const priority = req.body.priority;
    const title = req.body.title;
    const problem = req.body.problem;
    const solution = req.body.solution
    const solved = req.body.solved;
    const queryText = `INSERT INTO "notes" ("user_id", "car_id", "type", "priority", "title", "problem", "solution", "solved")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [user_id, car_id, type, priority, title, problem, solution, solved])
        .then((result) => {
            console.log('POST successful to notes table "problems"', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error POSTing to notes table "problems"', error);
            res.sendStatus(500);
        })
});

// PUT
router.put('/note/:note_id', rejectUnauthenticated, (req, res) => {
    // Allows you to edit a note
    console.log('this is the req.body', req.body);
    console.log('this is the id', req.params.note_id);
    const note_id = req.params.note_id;
    const user_id = req.user.id;
    const newPriority = req.body.priority;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newSolved = req.body.solved;
    const queryText = `UPDATE "notes" SET "priority"=$1, "title"=$2, "text"=$3, "solved"=$4
    WHERE "user_id"=$5 AND "id"=$6;`;
    pool.query(queryText, [newPriority, newTitle, newText, newSolved, user_id, note_id])
        .then((result) => {
            console.log('POST UPDATE to notes table "problems"', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error UPDATE notes table "problems"', error);
            res.sendStatus(500);
        })
});

router.put('/problem/:note_id', rejectUnauthenticated, (req, res) => {
    // Allows you to edit a note
    console.log('this is the req.body', req.body);
    console.log('this is the id', req.params.note_id);
    const note_id = req.params.note_id;
    const user_id = req.user.id;
    const newPriority = req.body.priority;
    const newTitle = req.body.title;
    const newProblem = req.body.problem;
    const newSolution = req.body.solution;
    const newSolved = req.body.solved;
    const queryText = `UPDATE "notes" SET "priority"=$1, "title"=$2, "problem"=$3, "solution"=$4, "solved"=$5
    WHERE "user_id"=$6 "id"=$7;`;
    pool.query(queryText, [newPriority, newTitle, newProblem, newSolution, newSolved, user_id, note_id])
        .then((result) => {
            console.log('POST UPDATE to notes table "problems"', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error UPDATE notes table "problems"', error);
            res.sendStatus(500);
        })
});

// DELETE
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    // Delete selected note from database
    const user_id = req.user.id
    const id = req.params.id;
    const queryText = `DELETE FROM "notes" WHERE "user_id"=$1 AND "id"=$2;`;
    pool.query(queryText, [user_id, id])
        .then((result) => {
            console.log('DELETED note', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error DELETING note', error);
            res.sendStatus(500);
        });
})


module.exports = router;
