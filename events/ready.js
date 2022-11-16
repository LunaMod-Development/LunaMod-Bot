const { Client, ClientUser } = require('discord.js');
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  console.log(`${client.user.tag} Has logged in`);
  async function ll() {
    let totalMembers = 0;

    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size;
    }

    var status = 'luna.ml | !help';

    const types = ['PLAYING'];
    let randomType = types[Math.floor(Math.random() * types.length)];
    if (randomType === 'PLAYING') status = `@${client.user.username} help`;

    if (randomType === 'PLAYING') {
      status = `luna.ml | !help`;
    }

    client.user.setPresence({
      activity: { type: randomType, url: 'https://indev.bot | !help', name: status },
      status: 'online',
    });

    //     client.user.setPresence({activity: {type: types[Math.floor(Math.random() * types.length)], url: "https://www.twitch.tv/", name: `${status[Math.floor(Math.random() * status.length)]}`}, status:  ss[Math.floor(Math.random() * ss.length)]});
  }
  setInterval(() => {
    ll();
  }, 5000);
};
