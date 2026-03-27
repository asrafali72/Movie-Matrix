const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  getSortedMovies
} = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authmiddleware');

// Public Routes
router.route('/').get(getMovies).post(protect, admin, createMovie);
router.route('/search').get(searchMovies);
router.route('/sorted').get(getSortedMovies);

// Admin Routes (Protected)
router
  .route('/:id')
  .get(getMovieById)
  .put(protect, admin, updateMovie)
  .delete(protect, admin, deleteMovie);

module.exports = router;