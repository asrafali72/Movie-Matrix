import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const AddMoviePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: '',
    posterUrl: ''
  });
  const [error, setError] = useState('');
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`, 
      },
    };

    try {
      await axios.post('/api/movies', formData, config);
      navigate('/'); // Redirect to home on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Movie
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Rating (0-10)"
            name="rating"
            type="number"
            inputProps={{ step: "0.1", min: "0", max: "10" }}
            value={formData.rating}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Release Date"
            name="releaseDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.releaseDate}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            margin="normal"
            required
          />
           <TextField
            fullWidth
            label="Poster Image URL"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            margin="normal"
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3 }}
            size="large"
          >
            Add Movie
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddMoviePage;