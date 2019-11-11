const express = require('express');
const router = express.Router();

// Load input validation
// const validateSurveyInput = require('../../validation/survey');

// Load Course model
const Survey = require('../../models/Survey');

router.get('/', (req, res) => {
    Survey.find()
        .then(survey => res.json(survey[0]))
        .catch(err => res.status(404).json(err));
})

router.post('/', (req, res) => {
    const newSurvey = new Survey({
        
    });

    newSurvey.save().then(survey => res.json(survey));
})

module.exports = router;