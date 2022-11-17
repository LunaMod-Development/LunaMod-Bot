const { SlashCommandBuilder } = require('@discordjs/builders');
const vm = require('vm');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evaluates JavaScript code')
        .addStringOption(option => option.setName('code').setDescription('The code to evaluate')),
    async execute(interaction) {
        const code = interaction.options.getString('code');
        const sandbox = {
            interaction: interaction,
            client: interaction.client,
            require: require,
            console: console,
            process: process,
            Buffer: Buffer,
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
            setInterval: setInterval,
            clearInterval: clearInterval,
            setImmediate: setImmediate,
            clearImmediate: clearImmediate,
            __dirname: __dirname,
            __filename: __filename,
            module: module,
            exports: exports,
            global: global
        };
        const context = vm.createContext(sandbox);
        let result;
        try {
            result = vm.runInContext
                ? vm.runInContext(code, context)
                : vm.runInNewContext
                    ? vm.runInNewContext(code, context) : vm.run(code, context);
        }
        catch (error) {
            result = error;
        }
        await interaction.reply(`\`\`\`js\n${result}\n\`\`\``);
    }
};
