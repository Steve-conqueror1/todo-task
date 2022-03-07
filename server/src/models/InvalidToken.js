const {
  model,
  Schema,
} = require('mongoose');

const schema = new Schema({
  token: {
      type: String,
      unique: true,
      required: [true, 'This field is required']
  },
});

module.exports = model('InvalidToken', schema);