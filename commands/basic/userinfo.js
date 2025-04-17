import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('View your user info.'),

  async execute(interaction) {
    const user = interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Info`)
      .setColor('#00ff99')
      .addFields(
        { name: 'Username', value: `${user.username}`, inline: true },
        { name: 'User ID', value: `${user.id}`, inline: true },
        { name: 'Created At', value: `${user.createdAt}`, inline: false }
      );
    await interaction.reply({ embeds: [embed] });
  }
};
