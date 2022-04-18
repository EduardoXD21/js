const Levels = require('discord-xp');
// const {
//     mongooseConnectionString
// } = require("../index.js")
Levels.setURL("mongodb+srv://dripSbot:WY3FbsChgMlZppTQ@dripbot.nrjni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const client = require('../index');

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const randomxp = Math.floor(Math.random() * 10) + 1; 
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomxp);
    let channel = message.guild.channels.cache.find(channel => channel.name === "nivel");
    if (hasLevelUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        channel.send(`${message.author} Felicitaciones, has subido a nivel \`${user.level}\``)
    }
})