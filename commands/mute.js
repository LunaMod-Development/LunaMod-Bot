const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a user')
        .addUserOption(option => option.setName('user').setDescription('The user to mute'))
        .addStringOption(option => option.setName('reason').setDescription('The reason for muting the user')),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        if (user) {
            if (reason) {
                const guild = interaction.guild;
                const guildId = guild.id;
                const guildDoc = await client.db.guilds.findOne
                if (guildDoc) {
                    const mutedRole = guild.roles.cache.find(role => role.name === 'Muted');
                    if (mutedRole) {
                        await guild.members.cache.get(user.id).roles.add(mutedRole);
                        interaction.reply(`Successfully muted ${user.username} for ${reason}`);
                    }
                    else {
                        interaction.reply('The Muted role doesn\'t exist!');
                    }
                }
                else {
                    interaction.reply('This server isn\'t in the database!');
                }
            }
            else {
                interaction.reply('You didn\'t specify the reason!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the user to mute!');
        }
    }
};