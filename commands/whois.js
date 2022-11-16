const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Shows information about a user')
        .addUserOption(option => option.setName('user').setDescription('The user to show information of')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            interaction.reply(`Showing information of ${user.username}`);
        }
        else {
            interaction.reply('You didn\'t specify the user to show information of!');
        }
    }
};