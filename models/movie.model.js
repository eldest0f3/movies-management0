const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie name is required']
  },
  imageURL: {
    type: String,
    required: [true, 'Image URL is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be after 1900']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
