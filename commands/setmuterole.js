const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmuterole')
        .setDescription('Sets the mute role')
        .addRoleOption(option => option.setName('role').setDescription('The role to set as the mute role')),
    async execute(interaction, client) {
        const role = interaction.options.getRole('role');
        if (role) {
            const guild = interaction.guild;
            const guildId = guild.id;
            const guildDoc = await client.db.guilds.findOne
            if (guildDoc) {
                await client.db.guilds.updateOne({ guildId
                }, { $set: { muteRole: role.id } });
                interaction.reply(`Successfully set the mute role to ${role}`);
            }
            else {
                interaction.reply('This server isn\'t in the database!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the role to set as the mute role!');
        }
    }
};
