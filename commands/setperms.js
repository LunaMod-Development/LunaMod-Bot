const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setperms')
        .setDescription('Sets the permissions of a role')
        .addRoleOption(option => option.setName('role').setDescription('The role to set the permissions of').setRequired(true))
        .addStringOption(option => option.setName('permissions').setDescription('The permissions to set').setRequired(true)),
    async execute(interaction, client) {
        const role = interaction.options.getRole('role');
        const permissions = interaction.options.getString('permissions');
        if (role && permissions) {
            const guild = interaction.guild;
            const guildId = guild.id;
            const guildDoc = await client.db.guilds.findOne
            if (guildDoc) {
                await client.db.guilds.updateOne({ guildId
                }, { $set: { permissions: permissions } });
                interaction.reply(`Successfully set the permissions of ${role} to ${permissions}`);
            }
            else {
                interaction.reply('This server isn\'t in the database!');
            }
        }
        else {
            interaction.reply('You didn\'t specify the role or the permissions!');
        }
    }
};