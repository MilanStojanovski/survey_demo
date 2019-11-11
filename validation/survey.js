const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateSurveyInput(data) {
    let errors = {};
    
    if (!validator.isLength(data.name, { min: 1 })) {
        errors.name = 'Name must not be empty';
    }
    if (!validator.isLength(data.date, { min: 1 })) {
        errors.date = 'Date must not be empty';
    }
    if (!validator.isLength(data.companyName, { min: 1 })) {
        errors.companyName = 'Company name must not be empty';
    }
    if (!validator.isLength(data.companyPhone, { min: 1 })) {
        errors.companyPhone = 'Company phone must not be empty';
    }
    if (!validator.isLength(data.companyEmail, { min: 1 })) {
        errors.companyEmail = 'Company email must not be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};