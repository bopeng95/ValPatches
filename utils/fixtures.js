const Discord = require('discord.js');

const color = 0xdc3d4b;
const prefix = 'vp!';
const icon = new Discord.MessageAttachment('./assets/omen.png');
const errorMessages = {
  command: 'Invalid command. For available commands run ```vp!commands```',
  info: 'Invalid value.',
};

const cmdDetails = {
  cat: 'fetches the most recent patch notes',
  list: 'lists out all the previous patches',
  hl: 'retrieves the highlight image of recent patch',
  command: 'lists out available commands for this bot',
};

module.exports = {
  color,
  prefix,
  icon,
  errorMessages,
  cmdDetails,
};
