const Discord = require('discord.js');

const color = 0xdc3d4b;
const prefix = 'vp!';
const icon = new Discord.MessageAttachment('./assets/omen.png');

const errorMessages = {
  command: 'Invalid command. For available commands run ```vp!commands```',
  info: 'Invalid value. Check info for available patch values.```vp!info```',
  fetch: (sec) => `Don't fetch again so soon! Try again in ${sec} seconds.`,
  search: 'Fetch first to get the recent patch!```vp!fetch```',
};

const logMessages = {
  start: (size) => ` ValPatches ready. Total guild size is now ${size}`,
  fetch: (name, guild, remain) =>
    ` ${name} in guild ${guild} has ${remain}s left to fetch`,
  error: (from, msg) => ` ${from}: ${msg}`,
};

const cmdDetails = {
  fetch: 'fetches the most recent patch notes',
  info: 'lists out patch categories',
  'info <value>': 'displays the category details',
  hl: 'retrieves the highlight image of recent patch',
  commands: 'lists out available commands for this bot',
};

module.exports = {
  color,
  prefix,
  icon,
  logMessages,
  errorMessages,
  cmdDetails,
};
