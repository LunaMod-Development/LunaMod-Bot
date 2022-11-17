const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user')
        .addUserOption(option => option.setName('user').setDescription('The user to ban'))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        if (user) {
            const member = interaction.guild.members.cache.get(user.id);
            if (member) {
                member.ban({ reason: reason });
                interaction.reply(`Successfully banned ${user.tag}`);
            } else {
                interaction.reply('That user isn\'t in this guild!');
            }
        }
        else {
            interaction.reply('You didn\'t mention the user to ban!');
        }
    }
};
