require('dotenv').config();
const Discord = require('discord.js');

const { prefix, errorMessages } = require('./utils/fixtures');
const { commands } = require('./utils/commands');

const client = new Discord.Client();
const { CLIENT_TOKEN } = process.env;

client.once('ready', () => console.log('valpatches live'));

client.on('message', (message) => {
  const { content, channel } = message;
  if (!content.startsWith(prefix) || message.author.bot) return;
  const splitContent = content.split(/ +/);
  const command = splitContent[0].substring(prefix.length);

  if (commands[command]) commands[command](channel, splitContent[1]);
  else channel.send(errorMessages.command);
});

client.login(CLIENT_TOKEN);
