const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disable')
        .setDescription('Disables a command')
        .addStringOption(option => option.setName('command').setDescription('The command to disable')),
    async execute(interaction, client) {
        const command = interaction.options.getString('command');
        if (command) {
            const cmd = client.commands.get(command);
            if (cmd) {
                if (cmd.data.defaultPermission) {
                    cmd.data.setDefaultPermission(false);
                    client.commands.set(cmd.data.name, cmd);
                    interaction.reply(`Successfully disabled command ${command}`);
                }
                else {
                    interaction.reply('That command is already disabled!');
                }
            }
            else {
                interaction.reply('That command doesn\'t exist!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the command to disable!');
        }
    }
};
