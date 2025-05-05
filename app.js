const express = require('express');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movie.routes');
const cors = require('cors');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
