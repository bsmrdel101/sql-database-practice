const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    res.send(artistList);
});

router.post('/', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

module.exports = router;