const { errorMessages } = require('./fixtures');

const getInfo = (content, key) => {
  if (!content[key]) return errorMessages.info;
  const { name, str } = content[key];
  const modified = `**${name}**\n${str}`;
  return modified;
};

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

module.exports = { getInfo, generateModal, cacheModal };
