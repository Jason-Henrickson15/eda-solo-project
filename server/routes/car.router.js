const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GETs
router.get('/year', (req, res) => {
    // This route grabs all years from the database
    const queryText = `SELECT "year" FROM "cars" GROUP BY "year" ORDER BY "year" ASC;`;
    pool.query(queryText).then((result) => {
        console.log('GET year successful', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET year', error);
        res.sendStatus(500);
    });
});

router.get('/make/:year', (req, res) => {
    // This route grabs all makes with a certain year
    const year = req.params.year;
    console.log('this is the year we are looking for', year);
    const queryText = `SELECT "year", "make" FROM "cars" WHERE "year"=$1 GROUP BY "make", "year" ORDER BY "make" ASC;`;
    pool.query(queryText, [year]).then((result) => {
        console.log('GET makes successful', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET makes', error);
        res.sendStatus(500);
    });
});

router.get('/model/:year/:make', (req, res) => {
    // This route grabs all models with a certain year and make
    const year = req.params.year;
    const make = req.params.make;
    const queryText = `SELECT "year", "make", "model" FROM "cars" WHERE "year"=$1 AND "make"=$2
    GROUP BY "year","make","model";`;
    pool.query(queryText, [year, make]).then((result) => {
        console.log('GET models successful', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET models', error);
        res.sendStatus(500);
    });
});

router.get('/id/:year/:make/:model', (req,res) => {
    const year = req.params.year;
    const make = req.params.make;
    const model = req.params.model;
    const queryText = `SELECT "id" FROM "cars" WHERE "year"=$1 AND "make"=$2 AND "model"=$3;`;
    pool.query(queryText, [year, make, model])
    .then((result) => {
        console.log('GET id successful', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR getting car id', error);
        res.sendStatus(500);
    })

})

module.exports = router;
