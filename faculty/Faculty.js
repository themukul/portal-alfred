const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  department: String,
  isAdmin: {
    type: Boolean,
    default: true
  }
});

mongoose.model('Faculty', FacultySchema);

module.exports = mongoose.model('Faculty');