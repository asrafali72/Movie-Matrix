import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, CircularProgress } from '@mui/material';
import axios from 'axios'; // Your custom axios setup

const AIRecommendationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecommendation = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      // We will create this backend route next
      const { data } = await axios.post('/api/ai/recommend', { prompt });
      setRecommendation(data.text);
    } catch (err) {
      console.error(err);
      setError('Failed to get a recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        AI Movie Matchmaker
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Not sure what to watch? Tell the AI what you're in the mood for, and it will give you personalized recommendations.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <form onSubmit={handleGetRecommendation}>
          <TextField
            fullWidth
            label="What are you in the mood for?"
            placeholder="e.g., A funny sci-fi movie from the 90s, or something like Inception but with more action..."
            multiline
            rows={3}
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large" 
            disabled={loading || !prompt.trim()}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recommendations'}
          </Button>
        </form>

        {error && (
          <Typography color="error" sx={{ mt: 3 }}>
            {error}
          </Typography>
        )}

        {recommendation && (
          <Box sx={{ mt: 4, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="primary">
              The AI Suggests:
            </Typography>
            {/* Using pre-wrap to keep the formatting (newlines and spacing) the AI generates */}
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {recommendation}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AIRecommendationPage;