const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  name: String,
  description: String,
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty'
  },
  department: String,
  url: String
});

mongoose.model('Material', MaterialSchema);

module.exports = mongoose.model('Material');