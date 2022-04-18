const client = require("../index.js");
const chalk = require('chalk');

// const activities = [
// { name: 'Enlazando datos con Evolution AC🔮', type: 'PLAYING' }, 
// { name: 'Conectado a la base de datos 🟢', type: 'PLAYING' },
// { name: 'Chequeando parametros 🤖', type: 'PLAYING' },
// { name: 'developed by drip$', type: 'COMPETING' }
// ];
client.on('ready', () => {
    console.log(`${client.user.username} Listo para operar`);
    // client.user.setPresence({ status: 'online', activity: activities[0] });
    // let activity = 3;
    // setInterval(() => {
    //     activities[4] = { name: `${client.channels.cache.size} Canales`, type: 'WATCHING' };
    //     activities[5] = { name: `${client.users.cache.size} Usuarios`, type: 'WATCHING' };
    //     if (activity > 5) activity = 0;
    //     client.user.setActivity(activities[activity]);
    //     activity++;
    // }, 5000);
})
