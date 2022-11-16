const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Shows the warnings of a user')
        .addUserOption(option => option.setName('user').setDescription('The user to show the warnings of')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            interaction.reply(`Showing warnings of ${user.username}`);
        }
        else {
            interaction.reply('You didn\'t specify the user to show the warnings of!');
        }
    }
};
