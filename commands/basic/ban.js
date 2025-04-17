import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option => option.setName('target').setDescription('User to ban').setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return await interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
    }
    const user = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(user.id);
    if (member) {
      await member.ban();
      await interaction.reply(`${user.username} has been banned.`);
    } else {
      await interaction.reply('User not found.');
    }
  }
};
