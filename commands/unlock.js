const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlocks a channel'),
    async execute(interaction) {
        const channel = interaction.channel;
        if (channel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SEND_MESSAGES: true,
            });
            interaction.reply(`Successfully unlocked ${channel.name}`);
        }
        else {
            interaction.reply('You didn\'t specify the channel to unlock!');
        }
    }
};
