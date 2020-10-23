require('dotenv').config();
const Discord = require('discord.js');

const logger = require('./utils/logger');
const { prefix, errorMessages, logMessages } = require('./utils/fixtures');
const { commands } = require('./utils/commands');
const { getPatchDetails } = require('./utils/cache');

const client = new Discord.Client();

const { CLIENT_TOKEN } = process.env;

client.once('ready', () => {
  const { guilds } = client;
  logger.info(logMessages.start(guilds.cache.size));
});

client.on('message', (message) => {
  const { content, channel, author, guild } = message;
  if (!content.startsWith(prefix) || author.bot) return;
  const splitContent = content.split(/ +/);
  const command = splitContent[0].substring(prefix.length);

  const send = (msg) => {
    channel.send(msg).catch((err) => {
      const { error } = logMessages;
      const from = `Message (${author.username} from ${guild.name})`;
      logger.error(error(from, err.message));
      channel.send(err.message);
    });
  };

  const patchDetails = getPatchDetails() || {};
  const config = { patchDetails, author, guild };
  const arg = splitContent[1];

  if (commands[command]) commands[command](send, config, arg);
  else channel.send(errorMessages.command);
});

client.login(CLIENT_TOKEN);
