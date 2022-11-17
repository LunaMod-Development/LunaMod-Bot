const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delwarn')
        .setDescription('Deletes a warning')
        .addIntegerOption(option => option.setName('id').setDescription('The id of the warning to delete')),
    async execute(interaction, client) {
        const id = interaction.options.getInteger('id');
        if (id) {
            const warning = client.warnings.get(id);
            if (warning) {
                client.warnings.delete(id);
                interaction.reply(`Successfully deleted warning ${id}`);
            }
            else {
                interaction.reply('That warning doesn\'t exist!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the id of the warning to delete!');
        }
    }
};
