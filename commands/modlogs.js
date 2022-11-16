const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modlogs')
        .setDescription('Sets the modlogs channel')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set as the modlogs channel')),
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        if (channel) {
            const guild = interaction.guild;
            const guildId = guild.id;
            const guildDoc = await client.db.guilds.findOne
            if (guildDoc) {
                await client.db.guilds.updateOne({ guildId }, { $set: { modlogs: channel.id } });
                interaction.reply(`Successfully set the modlogs channel to ${channel}`);
            }
            else {
                interaction.reply('This server isn\'t in the database!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the channel to set as the modlogs channel!');
        }
    }
};