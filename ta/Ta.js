const mongoose = require('mongoose');

const TaSchema = new mongoose.Schema({
  Course: String,
  description: String,
  maxTa: Number,
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty'
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

mongoose.model('Ta', TaSchema);

module.exports = mongoose.model('Ta');