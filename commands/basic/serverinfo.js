import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('View server information.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} Info`)
      .setColor('#00ff99')
      .addFields(
        { name: 'Total Members', value: `${interaction.guild.memberCount}`, inline: true },
        { name: 'Server ID', value: `${interaction.guild.id}`, inline: true },
        { name: 'Created At', value: `${interaction.guild.createdAt}`, inline: false }
      );
    await interaction.reply({ embeds: [embed] });
  }
};
