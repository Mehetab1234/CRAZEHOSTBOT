import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option => option.setName('target').setDescription('User to warn').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('target');
    await interaction.reply(`${user.username} has been warned.`);
    // Optional: Save warns in DB / file system
  }
};
