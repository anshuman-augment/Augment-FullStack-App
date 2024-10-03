const router = require('express').Router();
let Location = require('../models/location.model');

router.route('/').get((req, res) => {
  Location.find()
    .then(locations => res.json(locations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Location.findById(req.params.id)
    .then(location => res.json(location))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;