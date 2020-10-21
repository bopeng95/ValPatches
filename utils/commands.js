const { request } = require('./helpers');
const { getItem, isSamePatch, storeData } = require('./cache');
const { color, icon, errorMessages, cmdDetails } = require('./fixtures');

const getInfo = (key) => {
  const content = getItem('notes');
  if (!content[key]) return errorMessages.info;
  const { name, str } = content[key];
  const modified = `**${name}**\n${str}`;
  return modified;
};

const commands = {
  info: (channel, argument) => {
    const onComplete = ({ data }) => {
      storeData(data, { color });
      channel.send(getItem('embed'));
    };
    const callback = (result) => {
      console.log('result:', result);
      if (!result) request(channel, onComplete, '/recent');
      else if (argument) channel.send(getInfo(argument));
      else channel.send(getItem('embed'));
    };
    isSamePatch(channel, callback);
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
    const fields = Object.keys(cmdDetails).reduce((arr, name) => {
      const field = { name, value: cmdDetails[name] };
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

module.exports = { commands };
