const genericCrud = require('./generic.controller');
const { InvalidToken } = require('../models');

module.exports = {
    ...genericCrud(InvalidToken),
};
