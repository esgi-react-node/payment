const getErrors = require('./getErrors');
const {ValidationError} = require('sequelize');

const handleValidationError = (res, error) => {
  if (error instanceof ValidationError) {
    console.log(error.errors);
    const errors = getErrors(error)
    return res.status(400).json(errors);
  } else {
    console.log(error);
    return res.sendStatus(500);
  }
}

module.exports = handleValidationError;
