const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = '!'; // Define a command prefix

// Command collection to store all commands
bot.commands = new Map();

// Dynamically load all command files from the 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', file));
  bot.commands.set(command.name, command);
}

// Event: When the bot is ready
bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

// Event: When a message is received
bot.on('messageCreate', (message) => {
  // Avoid responding to the bot's own messages
  if (message.author.bot) return;

  // Check if the message starts with the command prefix
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check if the command exists in the bot's commands
    const command = bot.commands.get(commandName);

    if (command) {
      try {
        // Execute the command
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
      }
    } else {
      message.reply('Command not found!');
    }
  }
});

// Log in to Discord with the bot's token
bot.login(process.env.DISCORD_TOKEN);
