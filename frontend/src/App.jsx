import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddMoviePage from './pages/AddMoviePage';
import SearchPage from './pages/SearchPage';
import EditMoviePage from './pages/EditMoviePage';
import AIRecommendationPage from './pages/AIRecommendationPage';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const App = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Header />
      <main>
        <Container sx={{ py: 3 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ai" element={<AIRecommendationPage />} />
            <Route path="/admin/add" element={<AddMoviePage />} />
            <Route path="/admin/edit/:id" element={<EditMoviePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Container>
      </main>
      <Fab 
      color="secondary" 
      onClick={() => navigate('/ai')} 
       sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, backgroundColor: '#1e1e1e', color: '#00e5ff', border: '1px solid #00e5ff', fontWeight: 'bold', '&:hover': { backgroundColor: '#333', boxShadow: '0 0 10px #00e5ff' } }}
      >
      <AutoAwesomeIcon sx={{ mr: 1 }} />
      </Fab>
    </>
  );
};

export default App;