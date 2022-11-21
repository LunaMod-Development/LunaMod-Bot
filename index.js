/**
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const app = express();
const port = 3000;

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
  intents: 32767,
});

client.on('ready', () => {
  console.log('Bot is online!');
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(token);
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));

 */

const fs = require('node:fs');
const path = require('node:path');
const express = require('express');

const { Client, Collection, GatewayIntentBits, REST, Events, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

rest = new REST({ version: '10' }).setToken(token);
const client = new Client({
  intents: 32767,
});

const app = express();
const port = 3000;

client.on('ready', () => {
  client.user.setPresence({
    activities: [
      {
        name: 'with slash commands',
        type: 'PLAYING',
      },
    ],
    status: 'online',
  });
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const traceback = error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    await interaction.reply({
      content: "There was an error while executing this command!\n\`\`\`\n" + traceback.slice(0, 2000) + "\n\`\`\`\n",
      ephemeral: true,
    });
  }
});

commands = [];
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
  await client.login(token);
  app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));
})();
