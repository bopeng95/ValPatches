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

const generateString = ({ notes }) => {
  return Object.keys(notes).reduce((arr, item, idx) => {
    const sections = Object.keys(notes[item]);
    const name = item === 'Entry' ? 'Intro' : item;
    let str = ``;
    sections.forEach((key) => {
      const section = notes[item][key];
      if (Array.isArray(section)) {
        const joined = section.join('\n- ');
        str += `- ${joined}`;
      } else if (key !== 'img' && key !== 'a') str += `${section}\n`;
    });
    if (str) arr.push({ name, value: idx, inline: true, str });
    return arr;
  }, []);
};

const cache = (arr) => {
  return arr.reduce((obj, item) => {
    const temp = obj;
    const { value, name, str } = item;
    temp[value] = { name, str };
    return temp;
  }, {});
};

module.exports = { request, generateString, cache };
