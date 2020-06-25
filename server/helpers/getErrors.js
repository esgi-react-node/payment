const getErrors = (error) => {
  return error.errors.reduce((acc, item) => {
    acc[item.path] = [...(acc[item.path] || []), item.message];
    return acc;
  }, {});
}

module.exports = getErrors;
