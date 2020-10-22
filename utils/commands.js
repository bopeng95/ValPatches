const throttle = require('./throttle');
const request = require('./request');
const { getInfo } = require('./helpers');
const { storeData } = require('./cache');
const { color, icon, cmdDetails, errorMessages } = require('./fixtures');

const fetchFunc = throttle((channel) => {
  const onComplete = ({ data }) => {
    storeData(data, { color });
    channel.send('Updated to newest patch!```vp!info```');
  };
  request(channel, onComplete, '/recent');
}, 60);

const commands = {
  fetch: (channel) => {
    const result = fetchFunc(channel);
    const remain = fetchFunc.getRemaining();
    if (!result) channel.send(errorMessages.fetch(remain));
  },
  info: (channel, patchDetails, argument) => {
    const { cat, notes } = patchDetails;
    if (!cat) channel.send(errorMessages.search);
    else if (!argument) channel.send(cat);
    else channel.send(getInfo(notes, argument));
  },
  hl: (channel, patchDetails) => {
    const { highlight } = patchDetails;
    if (!highlight) channel.send(errorMessages.search);
    else channel.send(highlight);
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
