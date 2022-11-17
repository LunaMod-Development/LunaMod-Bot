const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user')
        .addUserOption(option => option.setName('user').setDescription('The user to unban')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            await interaction.guild.members.unban(user.id);
            interaction.reply(`Successfully unbanned ${user.username}`);
        }
        else {
            interaction.reply('You didn\'t specify the user to unban!');
        }
    }
};
