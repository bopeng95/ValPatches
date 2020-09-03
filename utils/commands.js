/* eslint-disable prettier/prettier */
const { searchRecent, getPatchNotes } = require('./functions');

const prefix = 'vp!';

let recent = {};

const commands = {
  fetch: async (channel) => {
    channel.send('Getting latest patch notes...');
    const patch = await searchRecent();
    recent = Object.assign(recent, patch);

    const patchNotes = await getPatchNotes(patch.href);
    recent = Object.assign(recent, patchNotes);
    channel.send('Finished getting recent changes!');
  },
  hl: (channel) => {
    const { highlight, date, description } = recent;
    channel.send('Posting patch highlights...');
    if (highlight)
      channel.send(`${date} Highlights\n${description}`, {
        files: [highlight],
      });
    else channel.send('Fetch first!');
  },
  invalid: (channel) => channel.send('not a valid command'),
};

module.exports = { prefix, commands };
