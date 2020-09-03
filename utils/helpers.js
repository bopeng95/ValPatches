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
  const description = $(link).find('.NewsCard-module--title--1MoLu').text();
  const result = { href, date, description };
  return result;
};

const getDetails = (body) => {
  const $ = cheerio.load(body);
  const parent = $('.NewsArticleContent-module--articleSectionWrapper--3SR6V');
  const firstChild = parent.children()[0];

  // highlight image
  const highlightImg = $(firstChild).find('img');
  const hasHL = highlightImg.attr('alt').includes('Highlights');
  const src = highlightImg.attr('src');
  const highlight = hasHL ? src : '';
  // console.log($(firstChild).text());
  return { highlight };
};

module.exports = { getRecent, getDetails };
