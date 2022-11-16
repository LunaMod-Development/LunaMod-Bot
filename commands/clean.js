const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clean')
        .setDescription('Cleans the chat')
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to delete')),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        if (amount) {
            interaction.channel.bulkDelete(amount);
            interaction.reply(`Successfully deleted ${amount} messages`);
        }
        else {
            interaction.reply('You didn\'t specify the amount of messages to delete!');
        }
    }
};
