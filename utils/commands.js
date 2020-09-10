/* eslint-disable prettier/prettier */
const Discord = require('discord.js');

const { searchRecent, getPatchNotes } = require('./functions');

const color = 0xdc3d4b;
const prefix = 'vp!';
const icon = new Discord.MessageAttachment('./assets/omen.png');
const errorMessages = {
  0: 'Invalid command. For available commands run ```vp!commands```',
};

let recent = {};

const cmdDetail = {
  fetch: 'fetches the most recent patch notes',
  hl: 'retrieves the highlight image of recent patch',
  command: 'lists out available commands for this bot',
};

const commands = {
  fetch: async (channel) => {
    const patch = await searchRecent();
    if (patch.date === recent.date) channel.send('No need to fetch');
    else {
      channel.send('Getting latest patch notes...');
      recent = Object.assign(recent, patch);
      const patchNotes = await getPatchNotes(patch.href);
      recent = Object.assign(recent, patchNotes);
      console.log(recent.data);
      channel.send('Finished getting recent changes!');
    }
  },
  hl: (channel) => {
    const { highlight, date, patch } = recent;
    if (highlight) {
      const embed = {
        description: `${date} Highlights`,
        author: { name: patch },
        image: { url: highlight },
        color,
      };
      channel.send({ embed });
    } else channel.send('Fetch first!');
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
