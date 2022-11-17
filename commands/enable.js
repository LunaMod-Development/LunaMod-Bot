const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enable')
        .setDescription('Enables a command')
        .addStringOption(option => option.setName('command').setDescription('The command to enable')),
    async execute(interaction, client) {
        const command = interaction.options.getString('command');
        if (command) {
            const cmd = client.commands.get(command);
            if (cmd) {
                if (!cmd.data.defaultPermission) {
                    cmd.data.setDefaultPermission(true);
                    client.commands.set(cmd.data.name, cmd);
                    interaction.reply(`Successfully enabled command ${command}`);
                }
                else {
                    interaction.reply('That command is already enabled!');
                }
            }
            else {
                interaction.reply('That command doesn\'t exist!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the command to enable!');
        }
    }
};