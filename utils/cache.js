const NodeCache = require('node-cache');

const { request } = require('./helpers');

const cache = new NodeCache();

const storeMultiple = (arr) => cache.mset(arr);
const getItem = (key) => cache.get(key);

const generateModal = (notes) => {
  return Object.keys(notes).reduce((arr, item, idx) => {
    const sections = Object.keys(notes[item]);
    const name = item === 'Entry' ? 'Intro' : item;
    let str = ``;
    sections.forEach((key) => {
      const section = notes[item][key];
      if (Array.isArray(section)) {
        const joined = section.join('\n\n- ');
        str += `- ${joined}`;
      } else if (key !== 'img' && key !== 'a') str += `${section}\n`;
    });
    if (str) arr.push({ name, value: `v${idx}`, inline: true, str });
    return arr;
  }, []);
};

const cacheModal = (arr) => {
  return arr.reduce((obj, item) => {
    const temp = obj;
    const { value, name, str } = item;
    temp[value] = { name, str };
    return temp;
  }, {});
};

const storeData = (data, config = {}) => {
  console.log('Nothing stored');
  const { notes, date, description, highlight, patch } = data;
  const fields = generateModal(notes);
  const infoContent = cacheModal(fields);
  const details = `Patch: ${patch}\n`;
  const instruction = 'type command below to see details ```vp!info <value>```';
  const cat = {
    fields,
    author: { name: `Categories` },
    description: `${details}${instruction}`,
    ...config,
  };
  const hl = {
    description: `${date} Highlights`,
    author: { name: description },
    image: { url: highlight },
    ...config,
  };
  storeMultiple([
    { key: 'cat', val: { embed: cat } },
    { key: 'notes', val: infoContent },
    { key: 'highlight', val: { embed: hl } },
    { key: 'patchNum', val: patch },
  ]);
  console.log('stored');
};

const isSamePatch = (channel, onComplete) => {
  console.log('\nChecking if same patch');
  const callback = ({ data }) => {
    const first = data[0];
    const patch = getItem('patchNum');
    const bool = first.patch === patch;
    console.log('result:', bool);
    onComplete(bool);
  };
  request(channel, callback);
};

module.exports = {
  storeData,
  getItem,
  isSamePatch,
};
