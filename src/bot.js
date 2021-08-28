const axios = require('axios');
const cheerio = require('cheerio');

require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('ready', () => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    setInterval(async () => {
        var result = await getByWorldName(process.env.SERVER_NAME);

        if (!result.createCharacter) return;
        channel.send(`${process.env.USERS_TO_NOTIFY} chracter creation on ${process.env.SERVER_NAME} is available!!!!!!!!`);

    }, process.env.POLLING_INTERVAL)
});

const getStatus = async () => {

    const data = {};

    const regionNames = ['jp', 'na', 'eu'];

    const { data: html } = await axios.get('https://na.finalfantasyxiv.com/lodestone/worldstatus/');

    let $ = cheerio.load(html, {
        normalizeWhitespace: true,
        decodeEntities: false
    });

    const regions = $('div > .js--tab-content');


    /*
    * Hierachy: Region > Server > World
    */

    /*
    * Regions (JP, NA, EU)
    */
    regions.each(async (i, e) => {
        const servers = $('li[class="world-dcgroup__item"]', e);
        const serversData = {};

        const regionName = regionNames[i];

        /*
        * Each World Server per Data Center
        */
        servers.each((i, el) => {
            const serverName = $('h2[class="world-dcgroup__header"]', el).first().text();

            const worlds = $('div[class="world-list__item"]', el);
            const worldsData = [];

            /*
            * Each Home World per World Server
            */
            worlds.each((i, ele) => {
                worldsData.push({
                    name: $('div[class="world-list__world_name"]', ele).children('p').text(),
                    status: $('i[class="world-ic__1 js__tooltip"]', ele).attr('data-tooltip').trim(),
                    category: $('div[class="world-list__world_category"]', ele).children('p').text(),
                    createCharacter: $('i[class="world-ic__available js__tooltip"]', ele).attr('data-tooltip') === 'Creation of New Characters Available',
                    server: serverName,
                    region: regionName,
                });
            });

            serversData[serverName] = worldsData;

        });

        data[regionNames[i]] = serversData;
    });

    return data;

};

const getAllWorlds = async () => {
    const data = await getStatus();
    let worlds = [];

    for (const region in data) {
        for (const server in data[region]) {
            worlds = worlds.concat(data[region][server]);
        }
    }

    return worlds;
};

const getByWorldName = async (name) => {
    const worlds = await getAllWorlds();
    return worlds.find(world => world.name.toLowerCase() === name.toLowerCase());
};