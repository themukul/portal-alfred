const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rollnumber: String,
  branch: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Student', StudentSchema);

module.exports = mongoose.model('Student');