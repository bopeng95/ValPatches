/* eslint-disable prettier/prettier */
const cheerio = require('cheerio');

const patchOnly = 'VALORANT Patch Notes';

const getRecent = (body) => {
  const $ = cheerio.load(body);
  const news = $('.NewsArchive-module--newsCard--3GNFp');
  const recent = news.filter((i, el) => {
    const link = $(el).find('a');
    const description = $(link).find('.NewsCard-module--title--1MoLu').text();
    return description.startsWith(patchOnly);
  })[0];
  const link = $(recent).find('a');
  const href = $(link).attr('href');
  const date = $(link)
    .find('.copy-02 .NewsCard-module--published--37jmR')
    .text();
  const patch = $(link).find('.NewsCard-module--title--1MoLu').text();
  const result = { href, date, patch };
  return result;
};

const getDetails = (body) => {
  const $ = cheerio.load(body);
  const parent = $('.NewsArticleContent-module--articleSectionWrapper--3SR6V');
  const firstChild = parent.children()[0];

  let key = 'Entry';
  let sub = '';
  const data = {};

  // highlight image
  const highlightImg = $(firstChild).find('img');
  const hasHL = highlightImg.attr('alt').includes('Highlights');
  const src = highlightImg.attr('src');
  const highlight = hasHL ? src : '';
  // console.log($(firstChild).text());

  const extractList = (main, elem) => {
    const items = $(elem).children();
    items.each((i, el) => {
      const tag = el.tagName;
      if (tag === 'ul') extractList(main, el);
      else {
        const list = $(el).find('ul');
        if (list.html()) {
          main.push($(el).find('strong').text());
          extractList(main, list);
        } else main.push($(el).text());
      }
    });
  };

  $(firstChild)
    .children()
    .each((i, el) => {
      const list = [];
      const tag = el.tagName;
      const hasStrong = $(el).children()[0];
      let text = $(el).text();
      if (tag === 'h2') {
        key = text;
        sub = '';
      }
      if (tag === 'h3') sub = text;
      if (tag === 'p' && hasStrong && hasStrong.name === 'strong') sub = text;
      if (tag === 'img') text = $(el).attr('src');
      if (tag === 'ul') extractList(list, el);

      if (!data[key]) data[key] = {};
      if (sub && !data[key][sub]) data[key][sub] = {};

      const value = list.length ? list : text;
      if (sub) data[key][sub][tag] = value;
      else data[key][tag] = value;
    });

  return { highlight, data };
};

module.exports = { getRecent, getDetails };
