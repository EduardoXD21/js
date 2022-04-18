// const { MessageEmbed } = require('discord.js');
// const db = require('quick.db')

// module.exports = {
//     name: 'mf',
//     description: "Sirve para ver la cantidad de felicitaciónes que tiene un usuario y su nivel",
//     run: async(client, message, args) =>{
//         let user = message.mentions.members.first() || message.author || message.guild.members.cache.get(args[0]);
//         let thanks = await db.get(`userthanks_${user.id}`)
//         let thanksl = await db.get(`userthanks_${user.id}`)

//         if(thanks < 0) thanks = "Nivel 0"
//         if(thanks < 5) thanks = "Nivel 1"
//         if(thanks < 10) thanks = "Nivel 2"
//         if(thanks < 15) thanks = "Nivel 3"
//         if(thanks < 20) thanks = "Nivel 4"
//         if(thanks === null) thanks = "No tienes felicitaciónes"

//         let embed = new MessageEmbed()
//         .setAuthor(user.username || user.user.username)
//         .setThumbnail(user.displayAvatarURL() || user.user.displayAvatarURL())
//         .addField(`Nivel`, `\`${thanks}\`` || `\`Nuevo\``)
//         .addField(`Total de felicitaciónes`, `\`${thanksl}\`` || `\`0\``)
//         .setThumbnail()
//         .setColor('DARKGREEN')
//         .setFooter(message.guild.name, message.guild.iconURL())
//         message.channel.send({embeds: [embed]})
//     }
// }