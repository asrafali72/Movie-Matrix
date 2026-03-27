const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    posterUrl: {
      type: String, // URL to the image
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;