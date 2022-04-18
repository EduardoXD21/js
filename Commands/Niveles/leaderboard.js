// const Levels = require('discord-xp');
// const { MessageEmbed, Message } = require('discord.js')
// module.exports = {
//     name: 'top',
//     description: "Sirve para ver el top 5 de las personas que mas han escrito en el servidor",
//     run: async (client, message, args) => {
//         const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); 
//         const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
//         if (rawLeaderboard.length < 1) return message.reply('Nadie está en el top');


//         const l = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} -> Nivel: ${e.level} -> Xp: ${e.xp.toString()}`);

//         const top = new MessageEmbed()
// .setTitle('Top')
// .setColor('GOLD')
// .setDescription(`${l.join("\n\n")}`)
//         message.reply({
//             embeds: [top]
//         })
//     }
// }