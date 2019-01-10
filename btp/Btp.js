const mongoose = require('mongoose');

const BtpSchema = new mongoose.Schema({
  name: String,
  description: String,
  maxGroupSize: Number,
  submissionDate: {
    type: Date,
    default: new Date()
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty'
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

mongoose.model('Btp', BtpSchema);

module.exports = mongoose.model('Btp');