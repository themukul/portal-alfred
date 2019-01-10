const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  heading: String,
  description: String,
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty'
  },
  likes: {
    type: Number,
    default: 0
  }
});

mongoose.model('News', NewsSchema);

module.exports = mongoose.model('News');