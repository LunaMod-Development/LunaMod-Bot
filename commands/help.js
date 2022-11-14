const { MessageEmbed, Client, Message } = require('discord.js');

module.exports.config = {
    name: "help",
    group: "info",
    usage: 'help',
    guarded: true,
    example: "!help",
    botperms: ["EMBED_LINKS"],
    description: "Help menu for all commands"
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {

        try {
            let pu = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]))

            if (client.commands.has(args[0]) || client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))) {


                                 return message.channel.send(`
    
${pu.config.name ? `**Name:** ${pu.config.name}` : ""}${pu.config.description ? '\n' : ""}${pu.config.description ? `**Description:** ${pu.config.description}` : ""}${pu.config.aliases ? '\n' : ""}${pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ""}${pu.config.group ? '\n' : ""}${pu.config.group ? `**Group:** ${pu.config.group}` : ""}${pu.config.permissions ? '\n' : ''}${pu.config.permissions ? `**Permissions:** ${pu.config.permissions.join(', ').toLocaleLowerCase()}` : ""}${pu.config.usage ? '\n' : ""}${pu.config.usage ? `**Usage:** ${pu.config.usage}` : ""}${pu.config.example ? "\n" : ""}${pu.config.example ? `**Example:** ${pu.config.example}` : ""}                             

                `)

            } else {

            }
        } catch {
        }
                

    if (!args[0]) {
        let embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle("Help Page")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Type \`help [command]\` for help with a command \n\n \<:luna_moderation:1041399635509514381> ${client.prefix}help moderation - **Moderator Commands.** \n \<:luna_management:1041399543637487757> ${client.prefix}help management - **Management Commands**  \n \<:luna_misc:1041406063070687283> ${client.prefix}help misc - **Misc Commands.** \n \<:luna_info:1041402327267020900> ${client.prefix}help info - **Shows information commands.**  \n \<:luna_settings:1041399703977345145> ${client.prefix}help config - **Shows all config setting commands**`, true)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
    message.channel.send(embed)
    };

     if (args[0] === 'misc') {
         let misc = [];

         client.commands.forEach((command) => {
            if (command.config.group === 'misc') misc.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const miscEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Misc Commands_** \n\n ${misc.join('\n')}`)

        message.channel.send(miscEmbed);

     }

     if (args[0] === 'management') {
        let mnge = [];
     
        client.commands.forEach((command) => {
           if (command.config.group === 'management') mnge.push(`\`${command.config.name}\` - ${command.config.description}`);
       })

       const managementEmbed = new MessageEmbed()
       .setColor(client.color)
       .setDescription(`**_Management Commands_** \n\n ${mnge.join('\n')}`)

       message.channel.send(managementEmbed);
     }


     if (args[0] === 'config') {
         let configuration = [];
     
         client.commands.forEach((command) => {
            if (command.config.group === 'config') configuration.push(`\`${command.config.name}\` - ${command.config.description}`);
        })

        const configEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Config Commands_** \n\n ${configuration.join('\n')}`)

        message.channel.send(configEmbed);

        }

    if (args[0] === 'info' || args[0] === 'information') {
        let infoo = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'info') infoo.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const infoEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Info Commands_** \n\n ${infoo.join('\n')}`)

        message.channel.send(infoEmbed);
    }
    if (args[0] === 'moderation') {
        let mod = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'moderation') {
                mod.push(`\`${command.config.name}\` - ${command.config.description}`);
            }
            });

        const modEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Moderation Commands_** \n\n ${mod.join('\n')}`)

        message.channel.send(modEmbed);
    }
}