const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Locks a channel')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to lock')),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        if (channel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });
            interaction.reply(`Successfully locked ${channel}`);
        }
        else {
            interaction.reply('You didn\'t specify the channel to lock!');
        }
    }
};