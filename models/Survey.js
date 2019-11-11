const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// Create choice schema
const ChoiceSchema = new Schema({
    label: {type: String, required: true},
    value: {type: String},
    next: {type: String}
})
// Create survey item schema
const SurveyItemSchema = new Schema({
    questionID: {type: String, required: true},
    type: {type: String},
    heading: {type: String},
    body: {type: String},
    question: {type: String},
    next: {type: String},
    choices: {type: [{ type: ChoiceSchema}]}
})
// Create survey schema
const SurveySchema = new Schema({
    surveyItems: {type: [{ type: SurveyItemSchema }]}
})

module.exports = Survey = mongoose.model('surveys', SurveySchema);