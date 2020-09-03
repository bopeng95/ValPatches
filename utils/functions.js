/* eslint-disable prettier/prettier */
const fetch = require('node-fetch');

const { getRecent, getDetails } = require('./helpers');

const domain = 'https://playvalorant.com';

const searchRecent = () => {
  return fetch(`${domain}/en-us/news/`)
    .then((res) => res.text())
    .then(getRecent);
};

const getPatchNotes = (path) => {
  return fetch(`${domain}${path}`)
    .then((res) => res.text())
    .then(getDetails);
};

module.exports = { searchRecent, getPatchNotes };
