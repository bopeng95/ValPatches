const fetch = require('node-fetch');

const logger = require('./logger');
const { logMessages } = require('./fixtures');

const api = 'https://valapi.vercel.app/patches';

const request = (send, onComplete, path = '/') => {
  const url = `${api}${path}`;
  fetch(url)
    .then(async (res) => {
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      return json;
    })
    .then(onComplete)
    .catch(({ message }) => {
      const { error } = logMessages;
      logger.error(error('Request', message));
      send(message);
    });
};

module.exports = request;
