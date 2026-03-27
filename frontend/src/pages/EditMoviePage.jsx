import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Or from 'axios' depending on your setup
import AuthContext from '../context/AuthContext';

const EditMoviePage = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [formData, setFormData] = useState({
    title: '', description: '', rating: '', releaseDate: '', duration: '', posterUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch the existing movie data when the page loads
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`/api/movies/${id}`);
        // Format the date so the HTML date picker can read it (YYYY-MM-DD)
        const formattedDate = data.releaseDate ? new Date(data.releaseDate).toISOString().split('T')[0] : '';
        setFormData({ ...data, releaseDate: formattedDate });
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    try {
      await axios.put(`/api/movies/${id}`, formData, config); // PUT request to update
      navigate('/'); // Go back home on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update movie');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Movie</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" required multiline rows={3} />
          <TextField fullWidth label="Rating (0-10)" name="rating" type="number" inputProps={{ step: "0.1", min: "0", max: "10" }} value={formData.rating} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Release Date" name="releaseDate" type="date" InputLabelProps={{ shrink: true }} value={formData.releaseDate} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Duration (minutes)" name="duration" type="number" value={formData.duration} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Poster Image URL" name="posterUrl" value={formData.posterUrl} onChange={handleChange} margin="normal" />
          
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} size="large">
            Update Movie
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditMoviePage;