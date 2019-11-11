const express = require('express');
const router = express.Router();

// Load SurveyAnswer model
const SurveyAnswer = require('../../models/SurveyAnswer');

router.get('/', (req, res) => {
    SurveyAnswer.find()
        .then(surveyAnsweres => res.json(surveyAnsweres))
        .catch(err => res.status(404).json(err));
})

router.post('/', (req, res) => {
    const newSurveyAnswer = new SurveyAnswer({
        surveyId: req.body.surveyId,
        answers: req.body.answers
    });

    newSurveyAnswer.save().then(surveyAnswer => res.json(surveyAnswer));
})

module.exports = router;