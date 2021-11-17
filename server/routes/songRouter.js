const express = require('express');
const router = express.Router();
// Require the pg module:
const pg = require('pg');

// Create a pool object constructor.
const Pool = pg.Pool;

const pool = new Pool({
    database: 'song',
    host: 'localhost'
  });

// Log to our console when our pool object makes a connection:
pool.on('connect', () => {
    console.log('Postgresql connected');
  });
  
  // Log to our console when something makes our pool error out:
  pool.on('error', (error) => {
    console.log('Error with postgres pool', error)
  });



// Get and post routes
router.get('/', (req, res) => {
    const sqlText = 'SELECT * FROM song;'
  pool.query(sqlText)
    .then((dbRes) => {
      const songFromDb = dbRes.rows;
      res.send(songFromDb)
    }).catch((dbErr) => {
      console.error(dbErr);
    });
});

router.post('/', (req, res) => {
    const newSong = req.body;
    const sqlText = (`
    INSERT INTO "song"
    "title", "length", "released")
    VALUES
      ($1, $2, $3);
  `)
  const sqlValues = [
    newSong.title,
    newSong.length,
    newSong.released,
  ]
  console.log(sqlText)
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error(dbErr);
    })
});

module.exports = router;