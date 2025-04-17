const express = require('express');
const path = require('path');
const bot = require('./bot'); // Import the bot from bot.js
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up the Discord bot status API route
app.get('/discord/status', (req, res) => {
  if (bot.user) {
    // Respond with the bot's current status (online/offline)
    res.json({ status: bot.user.presence.status });
  } else {
    res.json({ status: 'Offline' });
  }
});

// Render the homepage (public view)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
});

// Start the web server and the bot at the same time
app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});

// Start the bot (this is handled in bot.js)
bot.once('ready', () => {
  console.log(`Bot is ready and connected to Discord`);
});
