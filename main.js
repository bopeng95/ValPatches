/* eslint-disable prettier/prettier */
require('dotenv').config();
const Discord = require('discord.js');

const { prefix, commands } = require('./utils/commands');

const client = new Discord.Client();
const { CLIENT_TOKEN } = process.env;

client.once('ready', () => console.log('valpatches live'));

client.on('message', (message) => {
  const { content, channel } = message;
  if (!content.startsWith(prefix) || message.author.bot) return;
  const command = content.split(/ +/)[0].substring(prefix.length);

  if (commands[command]) commands[command](channel);
  else commands.invalid(channel);
});

client.login(CLIENT_TOKEN);
