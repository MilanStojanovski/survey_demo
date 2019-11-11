const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create survey answer schema
const SurveyAnswerSchema = new Schema({
    surveyId: {type: String, required: true},
    answers: {type: Schema.Types.Mixed}
})

module.exports = SurveyAnswer = mongoose.model('surveyAnswers', SurveyAnswerSchema);