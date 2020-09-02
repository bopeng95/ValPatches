/* eslint-disable prettier/prettier */
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => console.log('valpatches live'));

client.login(process.env.CLIENT_TOKEN);
