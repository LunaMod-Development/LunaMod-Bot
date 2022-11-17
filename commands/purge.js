// Purge message history by given amount
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purge message history by given amount.')
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('The amount of messages to delete.')
        .setRequired(true),
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    if (amount > 100) {
      const embed = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('The maximum amount of messages that can be deleted at once is 100.')
        .setColor(0xff0000);
      return interaction.reply({ embeds: [embed] });
    }
    await interaction.channel.bulkDelete(amount);
    const embed = new EmbedBuilder()
      .setTitle('Purge')
      .setDescription(`Deleted ${amount} messages.`)
      .setColor(0x00ff00);
    await interaction.reply({ embeds: [embed] });
  }
};
