const {
  model,
  Schema,
} = require('mongoose');

const { CREATED } = require('../constants');

const schema = new Schema({
  text: { type: String, unique: true, required: true },
  status: { type: Array, default: [CREATED] },
  email: { type: String,  unique:true, required: true },
  username: { type: String, unique:  true , required: true },
  isCompleted: {type: Boolean, required: true, default: false },
  editedByAdmin: {type: Boolean, required: true, default: false }
});

module.exports = model('Task', schema);
