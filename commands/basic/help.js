import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show available bot commands.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('CraftingCrazeGaming Bot - Commands')
      .setColor('#00ff99')
      .setDescription('Here are some commands you can use:')
      .addFields(
        { name: '/ping', value: 'Check bot latency.', inline: true },
        { name: '/ban', value: 'Ban a user (requires permission).', inline: true },
        { name: '/warn', value: 'Warn a user.', inline: true },
        { name: '/serverinfo', value: 'Get server details.', inline: true },
        { name: '/userinfo', value: 'View your user info.', inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  }
};
