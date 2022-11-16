const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Changes the nickname of a user')
        .addUserOption(option => option.setName('user').setDescription('The user to change the nickname of'))
        .addStringOption(option => option.setName('nickname').setDescription('The new nickname of the user')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const nickname = interaction.options.getString('nickname');
        if (user) {
            if (nickname) {
                await interaction.guild.members.cache.get(user.id).setNickname(nickname);
                interaction.reply(`Successfully changed ${user.username}'s nickname to ${nickname}`);
            }
            else {
                interaction.reply('You didn\'t specify the new nickname!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the user to change the nickname of!');
        }
    }
};