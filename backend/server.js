const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const aiRoutes = require('./routes/aiRoutes');
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});