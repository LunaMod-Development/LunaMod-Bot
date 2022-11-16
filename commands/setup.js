const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Sets up the bot'),
    async execute(interaction, client) {
        const guild = interaction.guild;
        const guildId = guild.id;
        const guildDoc = await client.db.guilds.findOne({
            guildId
        });
        if (guildDoc) {
            interaction.reply('This server is already in the database!');
        }
        else {
            await client.db.guilds.insertOne({
                guildId,
                permissions: 'everyone',
                muteRole: null,
                modlogs: null,
            });
            interaction.reply('Successfully set up the bot!');
        }
    }
};