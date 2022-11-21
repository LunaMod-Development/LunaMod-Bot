const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joindate')
    .setDescription('Get the join date of a user.')
    .addUserOption((option) => option.setName('target').setDescription("The user of which you want to get the join date")),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    if (user) {
      const time = user.createdAt;
      const date = new Date(time);
      const dateString = date.toDateString();
      const embed = new EmbedBuilder()
        .setTitle(`Join date for ${user.username}`)
        .setDescription(`ID: ${user.id}`)
        .addFields({
          name: 'Join Date',
          value: dateString?.toString() || 'Unknown',
        })
        .setThumbnail(user.avatarURL())
        .setColor(0xffffff);
      await interaction.reply({ embeds: [embed] });
    }
  },
};
