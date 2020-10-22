const logger = require('./logger');
const throttle = require('./throttle');
const request = require('./request');
const { getInfo } = require('./helpers');
const { storeData } = require('./cache');
const {
  color,
  icon,
  cmdDetails,
  errorMessages,
  logMessages,
} = require('./fixtures');

const fetchFunc = throttle((send) => {
  const onComplete = ({ data }) => {
    storeData(data, { color });
    send('Updated to newest patch!```vp!info```');
  };
  request(send, onComplete, '/recent');
}, 60);

const commands = {
  fetch: (send, config = {}) => {
    const {
      author: { username },
      guild: { name },
    } = config;
    const result = fetchFunc(send);
    if (!result) {
      const remain = fetchFunc.getRemaining();
      logger.warn(logMessages.fetch(username, name, remain));
      send(errorMessages.fetch(remain));
    }
  },
  info: (send, config = {}, argument) => {
    const { patchDetails } = config;
    const { cat, notes } = patchDetails;
    if (!cat) send(errorMessages.search);
    else if (!argument) send(cat);
    else send(getInfo(notes, argument));
  },
  hl: (send, config = {}) => {
    const { patchDetails } = config;
    const { highlight } = patchDetails;
    if (!highlight) send(errorMessages.search);
    else send(highlight);
  },
  commands: (send) => {
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
    send({ embed, files: [icon] });
  },
};

module.exports = { commands };
