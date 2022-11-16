const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of all commands'),
    async execute(interaction, client) {
        const commands = client.commands;
        let reply = 'Here\'s a list of all my commands:\n';
        commands.forEach(c => {
            reply += `${c.data.name}: ${c.data.description}\n`;
        }
        );
        await interaction.reply(reply);
    }
};