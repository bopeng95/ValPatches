/* eslint-disable prettier/prettier */
const { searchRecent, getPatchNotes } = require('./functions');

const prefix = '-';

const commands = {
  fetch: async (channel) => {
    channel.send('getting latest patch notes');
    const patch = await searchRecent();
    getPatchNotes(patch.href);
  },
  invalid: (channel) => channel.send('not a valid command'),
}

module.exports = { prefix, commands };