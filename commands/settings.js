const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Changes the settings of the bot')
        .addSubcommand(subcommand => subcommand
            .setName('prefix')
            .setDescription('Changes the prefix of the bot')
            .addStringOption(option => option.setName('prefix').setDescription('The new prefix of the bot')))
        .addSubcommand(subcommand => subcommand
            .setName('language')
            .setDescription('Changes the language of the bot')
            .addStringOption(option => option.setName('language').setDescription('The new language of the bot'))),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'prefix') {
            const prefix = interaction.options.getString('prefix');
            if (prefix) {
                client.prefix = prefix;
                interaction.reply(`Successfully changed the prefix to ${prefix}`);
            }
            else {
                interaction.reply('You didn\'t specify the new prefix!');
            }
        }
        else if (subcommand === 'language') {
            const language = interaction.options.getString('language');
            if (language) {
                client.language = language;
                interaction.reply(`Successfully changed the language to ${language}`);
            }
            else {
                interaction.reply('You didn\'t specify the new language!');
            }
        }
    }
};