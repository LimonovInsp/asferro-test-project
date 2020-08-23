const mongoose = require('mongoose');
const { Schema } = mongoose;

const Record = new Schema({
  name: String,
  surname: String,
  birthday: String,
  phone: String,
  email: String,
  identifier: String,
});

module.exports = mongoose.model('Record', Record);
