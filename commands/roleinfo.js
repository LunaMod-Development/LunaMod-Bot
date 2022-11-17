const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Shows Information about the role')
        .addRoleOption(option => option.setName('role').setDescription('The role to get info about').setRequired(true)),
    async execute(interaction, client) {
        const role = interaction.options.getRole('role');
        const embed = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setColor(role.hexColor)
            .addField('Name', role.name, true)
            .addField('ID', role.id, true)
            .addField('Hex', role.hexColor, true)
            .addField('Members', role.members.size, true)
            .addField('Position', role.position, true)
            .addField('Mentionable', role.mentionable ? 'Yes' : 'No', true)
            .addField('Hoisted', role.hoist ? 'Yes' : 'No', true)
            .addField('Created At', role.createdAt.toDateString(), false)
            .setTimestamp()
            .setFooter(`${interaction.user.username}`, interaction.user.displayAvatarURL());
        interaction.reply({ embeds: [embed] });
    }
};