const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Get the member count.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Member Count')
      .setDescription(`There are ${interaction.guild.memberCount.toString()} members in this server.`)
      .setColor(0xffffff);
    await interaction.reply({ embeds: [embed] });
  },
};
