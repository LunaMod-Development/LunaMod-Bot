const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user')
        .addUserOption(option => option.setName('user').setDescription('The user to kick'))
        .addStringOption(option => option.setName('reason').setDescription('The reason for kicking the user')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        if (user) {
            if (reason) {
                await interaction.guild.members.cache.get(user.id).kick(reason);
                interaction.reply(`Successfully kicked ${user.username} for ${reason}`);
            }
            else {
                interaction.reply('You didn\'t specify the reason!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the user to kick!');
        }
    }
};