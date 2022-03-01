const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET
router.get('/:noteID', (req, res) => {
  // GETs images
  const note_id = req.params.noteID;
  const queryText = `SELECT * FROM "images" WHERE "note_id"=$1;`;
  pool.query(queryText, [note_id])
  .then((result) => {
      console.log('GET images success', result);
      res.send(result.rows);
  }).catch((error) => {
      console.log('ERROR in GET for images', error);
      res.sendStatus(500);
  })
});

// POST
router.post('/', (req, res) => {
  // POSTs images
  const note_id = req.body.noteID;
  const image_path = req.body.path;
  const user_id = req.user.id;
  const queryText = `INSERT INTO "images" ("path", "note_id", "user_id") VALUES ($1, $2, $3);`;
  pool.query(queryText, [image_path, note_id, user_id])
  .then((result) => {
      console.log('POST to images successful');
      res.sendStatus(200);
  }).catch((error) => {
      console.log('ERROR posting to images', error);
      res.sendStatus(500);
  })
});

// DELETE
router.delete('/delete/:id', (req, res) => {
    // DELETE image
    const note_id = req.params.id;
    const user_id = req.user.id;
    const queryText = `DELETE FROM "images" WHERE "user_id"=$1 AND "note_id"=$2;`;
    pool.query(queryText, [user_id, note_id])
    .then((result) => {
        console.log('DELETE image success');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('ERROR DELETING image', error);
        res.sendStatus(500);
    })
})

module.exports = router;
