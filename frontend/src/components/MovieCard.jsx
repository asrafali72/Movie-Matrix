// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';

// const MovieCard = ({ movie }) => {
//   return (
//     <Card 
//       sx={{ 
//         width: '233px',       
//         height: '440px',      
//         display: 'flex', 
//         flexDirection: 'column',
//         margin: 'auto',       
//         position: 'relative'
//       }}
//     >
//       <Box sx={{ width: '100%', height: '320px', backgroundColor: '#000' }}>
//         <CardMedia
//           component="img"
//           image={movie.posterUrl || "https://via.placeholder.com/233x320?text=No+Poster"}
//           alt={movie.title}
//           sx={{ 
//             width: '100%',
//             height: '100%',       
//             objectFit: 'cover',   
//             objectPosition: 'center'
//           }}
//           onError={(e) => {
//              e.target.onerror = null; 
//              e.target.src="https://via.placeholder.com/233x320?text=No+Poster"
//           }}
//         />
//       </Box>
      
//       <CardContent 
//         sx={{ 
//           flexGrow: 1, 
//           display: 'flex', 
//           flexDirection: 'column',
//           justifyContent: 'flex-start', 
//           padding: '12px',
//           gap: '10px' 
//         }}
//       >
        
//         <Typography 
//           gutterBottom 
//           variant="subtitle1" 
//           component="div" 
//           title={movie.title}
//           sx={{ 
//             fontWeight: 'bold', 
//             lineHeight: 1.2,
//             maxHeight: '2.4em', 
//             overflow: 'hidden',
//             display: '-webkit-box',
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: 'vertical'
//           }}
//         >
//           {movie.title}
//         </Typography>
        
//         <Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//             <Rating value={movie.rating || 0} precision={0.1} readOnly size="small" />
//             <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
//               ({movie.rating})
//             </Typography>
//           </Box>

//           <Typography variant="caption" display="block" color="text.secondary">
//             Released: {new Date(movie.releaseDate).toLocaleDateString()}
//           </Typography>
//           <Typography variant="caption" display="block" color="text.secondary">
//             Duration: {movie.duration} min
//           </Typography>
//         </Box>

//       </CardContent>
//     </Card>
//   );
// };

// export default MovieCard;

import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Or 'axios' depending on your setup
import AuthContext from '../context/AuthContext';

const MovieCard = ({ movie }) => {
  const { user } = useContext(AuthContext); // Get logged-in user data
  const navigate = useNavigate();

  // Function to handle movie deletion
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/movies/${movie._id}`, config);
        window.location.reload(); // Refresh the page to remove the deleted movie
      } catch (error) {
        console.error("Failed to delete movie", error);
        alert("Failed to delete movie");
      }
    }
  };

  return (
    <Card sx={{ width: '233px',  display: 'flex', flexDirection: 'column', margin: 'auto', position: 'relative' }}>
      
      <Box sx={{ width: '100%', height: '320px', backgroundColor: '#000' }}>
        <CardMedia
          component="img"
          image={movie.posterUrl || "https://via.placeholder.com/233x320?text=No+Poster"}
          alt={movie.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/233x320?text=No+Poster" }}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '12px', gap: '10px' }}>
        <Typography gutterBottom variant="subtitle1" component="div" title={movie.title} sx={{ fontWeight: 'bold', lineHeight: 1.2, maxHeight: '2.4em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {movie.title}
        </Typography>
        
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Rating value={movie.rating || 0} precision={0.1} readOnly size="small" />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>({movie.rating})</Typography>
          </Box>
          <Typography variant="caption" display="block" color="text.secondary">Released: {new Date(movie.releaseDate).toLocaleDateString()}</Typography>
          <Typography variant="caption" display="block" color="text.secondary">Duration: {movie.duration} min</Typography>
        </Box>

        {/* --- NEW ADMIN BUTTONS (EDIT & DELETE) --- */}
        {user && user.role === 'admin' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
            <Button 
              size="small" 
              variant="outlined" 
              color="error"
              sx={{ color: 'gray', borderColor: 'gray' }}
              onClick={() => navigate(`/admin/edit/${movie._id}`)}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              color="error"
              sx={{ color: 'gray', borderColor: 'gray' }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;