const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('softban')
        .setDescription('Softbans a user')
        .addUserOption(option => option.setName('user').setDescription('The user to softban')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            await interaction.guild.members.cache.get(user.id).ban({ reason: 'Softban' });
            await interaction.guild.members.unban(user.id);
            interaction.reply(`Successfully softbanned ${user.username}`);
        }
        else {
            interaction.reply('You didn\'t specify the user to softban!');
        }
    }
};
