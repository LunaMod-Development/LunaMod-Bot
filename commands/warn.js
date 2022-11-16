const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user')
        .addUserOption(option => option.setName('user').setDescription('The user to warn'))
        .addStringOption(option => option.setName('reason').setDescription('The reason for warning the user')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        if (user) {
            if (reason) {
                user.send(`You have been warned in ${interaction.guild.name} for ${reason}`);
                interaction.reply(`Successfully warned ${user.username} for ${reason}`);
            }
            else {
                interaction.reply('You didn\'t specify the reason!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the user to warn!');
        }
    }
};