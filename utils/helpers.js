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
  console.log(result);
  return result;
};

const getDetails = (body) => {
  const $ = cheerio.load(body);
  const parent = $('.NewsArticleContent-module--articleSectionWrapper--3SR6V');
  const firstChild = parent.children()[0];
  console.log($(firstChild).text());
};

module.exports = { getRecent, getDetails };
