const Movie = require('../models/movie');

const getMovies = async (req, res) => {
  const pageSize = 12; // Adjust as needed
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await Movie.countDocuments({});
    const movies = await Movie.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ movies, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};


const createMovie = async (req, res) => {
  const { title, description, rating, releaseDate, duration, posterUrl } = req.body;

  const movie = new Movie({
    title,
    description,
    rating,
    releaseDate,
    duration,
    posterUrl
  });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
};

const updateMovie = async (req, res) => {
  const { title, description, rating, releaseDate, duration, posterUrl } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.rating = rating || movie.rating;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.duration = duration || movie.duration;
    movie.posterUrl = posterUrl || movie.posterUrl;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

const deleteMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.deleteOne();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

const searchMovies = async (req, res) => {
    const keyword = req.query.keyword
    ? {
        $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

    const movies = await Movie.find({ ...keyword });
    res.json(movies);
}

const getSortedMovies = async (req, res) => {
    const sortType = req.query.sortBy; // 'rating', 'name', 'date', 'duration'
    let sortQuery = {};

    if(sortType === 'rating') sortQuery = { rating: -1 }; // Descending
    else if(sortType === 'name') sortQuery = { title: 1 }; // Ascending
    else if(sortType === 'date') sortQuery = { releaseDate: -1 };
    else if(sortType === 'duration') sortQuery = { duration: 1 };

    const movies = await Movie.find({}).sort(sortQuery);
    res.json(movies);
}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  getSortedMovies
};