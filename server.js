const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Render the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
});

// Start the web server
app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});

// Import and start the Discord bot
require('./bot.js');
