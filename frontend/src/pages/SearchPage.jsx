import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/movies/search?keyword=${keyword}`);
      setMovies(data);
      setSearched(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Search Movies
        </Typography>
        
        <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <TextField
            label="Search by name or description..."
            variant="outlined"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{ width: '60%' }}
          />
          <Button variant="contained" size="large" type="submit">
            Search
          </Button>
        </form>
      </Box>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {searched && movies.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No movies found.
        </Typography>
      )}
    </Container>
  );
};

export default SearchPage;