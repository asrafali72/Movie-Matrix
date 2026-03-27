import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo / Title */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          MOVIE MATRIX
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button color="inherit" onClick={() => navigate('/ai')}>
          AI Recommender
          </Button>

          <Button color="inherit" component={Link} to="/search">
            Search
          </Button>

          {/* Show 'Add Movie' only if user is Admin */}
          {user && user.role === 'admin' && (
            <Button color="inherit" component={Link} to="/admin/add">
              Add Movie
            </Button>
          )}

          {/* Conditional Rendering based on Login Status */}
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;