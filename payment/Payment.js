const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  name: String,
  description: String,
  due_date: {
    type: Date,
    default: new Date()
  },
  status: {
    type: String,
    default: 'Pending'
  },
  amount: {
    type: Number,
    default: 0
  }
});

mongoose.model('Payment', PaymentSchema);

module.exports = mongoose.model('Payment');