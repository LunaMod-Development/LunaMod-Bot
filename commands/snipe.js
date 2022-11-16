const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Snipes the last deleted message'),
    async execute(interaction) {
        const snipedMessage = interaction.client.snipedMessages.get(interaction.channelId);
        if (snipedMessage) {
            await interaction.reply(`The last deleted message was: ${snipedMessage.content}`);
        }
        else {
            await interaction.reply('There are no deleted messages in this channel!');
        }
    }
};
