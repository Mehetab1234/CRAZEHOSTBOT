import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('worldclock')
    .setDescription('Check the current time in multiple cities or a specific one.')
    .addStringOption(option =>
      option.setName('mode')
        .setDescription('Choose all cities or a specific city')
        .setRequired(true)
        .addChoices(
          { name: 'All Cities', value: 'all' },
          { name: 'Single City', value: 'single' }
        )
    )
    .addStringOption(option =>
      option.setName('city')
        .setDescription('Select a city if choosing Single City mode')
        .addChoices(
          { name: 'New York', value: 'America/New_York' },
          { name: 'London', value: 'Europe/London' },
          { name: 'Tokyo', value: 'Asia/Tokyo' },
          { name: 'Mumbai', value: 'Asia/Kolkata' },
          { name: 'Sydney', value: 'Australia/Sydney' },
          { name: 'Dubai', value: 'Asia/Dubai' },
          { name: 'Berlin', value: 'Europe/Berlin' },
          { name: 'Los Angeles', value: 'America/Los_Angeles' },
          { name: 'Cairo', value: 'Africa/Cairo' },
          { name: 'Toronto', value: 'America/Toronto' }
        )
    ),

  async execute(interaction) {
    const mode = interaction.options.getString('mode');
    const selectedCity = interaction.options.getString('city');
    const now = new Date();

    if (mode === 'all') {
      const timeZones = {
        'New York': now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }),
        'London': now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London' }),
        'Tokyo': now.toLocaleTimeString('en-JP', { timeZone: 'Asia/Tokyo' }),
        'Mumbai': now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Sydney': now.toLocaleTimeString('en-AU', { timeZone: 'Australia/Sydney' }),
        'Dubai': now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai' }),
        'Berlin': now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin' }),
        'Los Angeles': now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }),
        'Cairo': now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Cairo' }),
        'Toronto': now.toLocaleTimeString('en-CA', { timeZone: 'America/Toronto' })
      };

      const embed = new EmbedBuilder()
        .setTitle('Ultimate World Clock')
        .setColor('#00ff99')
        .setDescription('Here’s the current time in major cities worldwide.')
        .setFooter({ text: 'Made by CraftingCrazeGaming' });

      for (const [city, time] of Object.entries(timeZones)) {
        embed.addFields({ name: city, value: time, inline: true });
      }

      await interaction.reply({ embeds: [embed] });

    } else if (mode === 'single') {
      if (!selectedCity) {
        return await interaction.reply({
          content: 'Please select a city when using **Single City** mode.',
          ephemeral: true
        });
      }

      const time = now.toLocaleTimeString('en-US', { timeZone: selectedCity });
      const embed = new EmbedBuilder()
        .setTitle('City Time')
        .setColor('#00ff99')
        .addFields({ name: selectedCity.replace('America/', '').replace('Europe/', '').replace('Asia/', '').replace('Africa/', ''), value: time })
        .setFooter({ text: 'Made by CraftingCrazeGaming' });

      await interaction.reply({ embeds: [embed] });
    }
  }
};
