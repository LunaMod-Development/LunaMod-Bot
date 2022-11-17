/**
 * Usage:
 *
 * /log [option] [value?]
 */

const fs = require('fs');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

function loadjson() {
  file = fs.readFileSync('config/log.json');
  var log;
  if (!file) {
    log = {};
  } else {
    try {
      log = JSON.parse(file);
    } catch (e) {
      log = {};
    }
  }
  return log;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('log')
    .setDescription('Configure the moderation log channel.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('set')
        .setDescription('Set the log channel.')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('The channel to set as the log channel.')
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('remove').setDescription('Remove the log channel.'),
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const guild_id = interaction.guild?.id?.toString();
    const embed = new EmbedBuilder();
    if (subcommand === 'set') {
      if (!guild_id) {
        embed.setTitle('Error').setDescription('An error occurred while setting the log channel.');
        return interaction.reply({ embeds: [embed] });
      }
      const channel = interaction.options.getChannel('channel');
      if (channel) {
        var log = loadjson();
        log[guild_id] = channel?.id?.toString();
        fs.writeFileSync('config/log.json', JSON.stringify(log));
        embed
          .setTitle('Log Channel Set')
          .setDescription(`The log channel has been set to ${channel}.`)
          .setColor(0x00ff00);
      }
    } else if (subcommand === 'remove') {
      var log = loadjson();
      if (log[guild_id]) {
        delete log[guild_id];
        fs.writeFileSync('config/log.json', JSON.stringify(log));
        embed
          .setTitle('Log Channel Removed')
          .setDescription('The log channel has been removed.')
          .setColor(0x00ff00);
      } else {
        embed
          .setTitle('Error')
          .setDescription('There is no log channel to remove.')
          .setColor(0xff0000);
      }
    }
    return interaction.reply({ embeds: [embed] });
  },
};
