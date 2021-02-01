const router = require('express').Router()
let Song = require('../models/backendmodels/song.model')

router.route('/').get((req, res) => {
    Song.find()
        .then(songs => res.json(songs))
        .catch(err => res.status(400).json('Error: ' +err))
})

router.get(`/:id`, function(req, res) {
    return Song.find(
        {"values.id": req.params.id}
    ).then(function(song) { 
        res.json(song)
    })
    .catch(function (err) {
        // handle error
        res.status(400).json('Error: '+err)
    })
});

router.route('/add').post((req, res) => {
    const values = req.body.values
    const newSong = new Song({
        values,
    })

    newSong.save()
            .then(() => res.json('Song added!'))
            .catch(err => res.status(400).json('Error: '+err))
})
module.exports = router