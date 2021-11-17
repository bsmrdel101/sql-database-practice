const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

router.post('/', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});

module.exports = router;