const Discord = require('discord.js');

const { request, generateString, cache } = require('./helpers');

const color = 0xdc3d4b;
const prefix = 'vp!';
const icon = new Discord.MessageAttachment('./assets/omen.png');
const errorMessages = {
  0: 'Invalid command. For available commands run ```vp!commands```',
};

const cmdDetail = {
  fetch: 'fetches the most recent patch notes',
  list: 'lists out all the previous patches',
  hl: 'retrieves the highlight image of recent patch',
  command: 'lists out available commands for this bot',
};

let recent = {};

const commands = {
  fetch: (channel) => {
    const onComplete = ({ data }) => {
      const fields = generateString(data);
      recent = cache(fields);
      const embed = {
        fields,
        color,
        author: { name: 'Categories' },
        description:
          'type command below to see details ```\nvp!info <value>```',
      };
      channel.send({ embed });
    };
    request(channel, onComplete, '/recent');
  },
  info: (channel, argument) => {
    const { name, str } = recent[argument];
    const modified = `**${name}**\n${str}`;
    channel.send(modified);
  },
  list: (channel) => {
    const onComplete = ({ data = [] }) => {
      const fields = data.map((item) => {
        const { date, description } = item;
        return { name: description, value: date };
      });
      const embed = { color, fields };
      channel.send({ embed });
    };
    request(channel, onComplete);
  },
  hl: (channel) => {
    const onComplete = ({ data }) => {
      const { highlight, description, date } = data;
      const embed = {
        color,
        description: `${date} Highlights`,
        author: { name: description },
        image: { url: highlight },
      };
      channel.send({ embed });
    };
    request(channel, onComplete, '/recent');
  },
  commands: (channel) => {
    const fields = Object.keys(cmdDetail).reduce((arr, name) => {
      const field = { name, value: cmdDetail[name] };
      arr.push(field);
      return arr;
    }, []);
    const author = {
      name: 'ValPatches Commands',
      icon_url: 'attachment://omen.png',
    };
    const embed = { author, fields, color };
    channel.send({ embed, files: [icon] });
  },
};

module.exports = { prefix, errorMessages, commands };
