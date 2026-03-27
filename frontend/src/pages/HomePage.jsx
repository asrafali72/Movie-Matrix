import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Alert, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNumber = 1, sortOption = '') => {
    setLoading(true);
    try {
      let url = `/api/movies?pageNumber=${pageNumber}`;
      
      if (sortOption) {
        url = `/api/movies/sorted?sortBy=${sortOption}`;
      }
      
      const { data } = await axios.get(url);
      
      if (data.movies) {
        setMovies(data.movies);
        setPage(data.page);
        setTotalPages(data.pages);
      } else if (Array.isArray(data)) {
        setMovies(data);
        setTotalPages(1); 
      } else {
        setMovies([]);
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page, sortBy);
  }, [page, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1); 
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading && movies.length === 0) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Top Movies</Typography>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="name">Name (A-Z)</MenuItem>
            <MenuItem value="rating">Rating (High to Low)</MenuItem>
            <MenuItem value="date">Release Date (Newest)</MenuItem>
            <MenuItem value="duration">Duration (Shortest)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {!Array.isArray(movies) || movies.length === 0 ? (
        <Alert severity="info">No movies found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie._id || Math.random()} xs={12} sm={6} md={4} lg={3}>
               <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}

      {!sortBy && totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handlePrevPage} 
            disabled={page === 1}
          >
            Previous
          </Button>
          
          <Typography variant="h6" sx={{ alignSelf: 'center' }}>
            Page {page} of {totalPages}
          </Typography>

          <Button 
            variant="contained" 
            onClick={handleNextPage} 
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Box>
      )}
    </>
  );
};

export default HomePage;