const NodeCache = require('node-cache');

const { generateModal, cacheModal } = require('./helpers');

const cache = new NodeCache();

const getPatchDetails = () => cache.get('patch');

const storeData = (data, config = {}) => {
  const { notes, date, description, highlight, patch } = data;
  const fields = generateModal(notes);
  const infoContent = cacheModal(fields);
  const details = `Date: ${date}\n\n`;
  const instruction = 'type command below to see details ```vp!info <value>```';
  const cat = {
    fields,
    author: { name: description },
    description: `${details}${instruction}`,
    ...config,
  };
  const hl = {
    description: `${date} Highlights`,
    author: { name: description },
    image: { url: highlight },
    ...config,
  };
  const patchDetails = {
    cat: { embed: cat },
    notes: infoContent,
    highlight: { embed: hl },
    patchNum: patch,
  };
  cache.set('patch', patchDetails);
};

module.exports = { storeData, getPatchDetails };
