const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date()
  },
  name: String,
  description: String,
  status: {
    type: String,
    default: 'Pending'
  },
  rejection_reason: String,
  appointment_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  appointment_for: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty'
  }
});

mongoose.model('Appointment', AppointmentSchema);

module.exports = mongoose.model('Appointment');