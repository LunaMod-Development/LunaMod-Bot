const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Shows the invites of a user'),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            const invites = await interaction.guild.invites.fetch();
            const userInvites = invites.filter(i => i.inviter.id === user.id);
            let reply = `${user.username} has ${userInvites.size} invites:\n`;
            userInvites.forEach(i => {
                reply += `${i.code} has ${i.uses} uses\n`;
            });
            interaction.reply(reply);
        }
        else {
            interaction.reply('You didn\'t specify the user to show the invites of!');
        }
    }
};
