// set modlogs

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmodlogs')
        .setDescription('Sets the modlogs channel for the server')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set as the modlogs channel')),
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        if (channel) {
            const guild = interaction.guild;
            const guildId = guild.id;
            const guildDoc = await client.db.guilds.findOne
            if (guildDoc) {
                guildDoc.modlogs = channel.id;
                await guildDoc.save();
                interaction.reply(`Successfully set modlogs channel to ${channel}`);
            }
            else {
                interaction.reply('That command doesn\'t exist!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the command to disable!');
        }
    }
};