const fetch = require('node-fetch');

const api = 'https://valapi.vercel.app/patches';

const request = (channel, onComplete, path = '/') => {
  const url = `${api}${path}`;
  const onError = ({ message }) => channel.send(message);
  fetch(url)
    .then(async (res) => {
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      return json;
    })
    .then(onComplete)
    .catch(onError);
};

module.exports = { request };
