// const { MessageEmbed } = require('discord.js');
// const ms = require('ms')
// const db = require ('quick.db')

// module.exports = {
//     name: 'felicitar',
//     description: "Sirve para felicitar a un usuario",
//     run: async (client, message, args) => {
//         const timeout = 1000;
//         let bump = await db.fetch(`cooldown_${message.author.id}`)
//         if(bump !== null && timeout - (Date.now() - bump) > 0) {
//             let time = ms(timeout - (Date.now() - bump), {long : true})
//             return message.channel.send(`**Tienes un cooldown activo**\n Tiempo restante: \`${time}\``)
//         }
//         let user = message.mentions.members.first() || message.guild.members.cache.get(args
//             [0]);
//             if (!user) return message.channel.send('Porfavor, etiqueta a la persona que deseas felicitar')
//             if(user.id === message.author.id) return message.channel.send('No te puedes felicitar a ti mismo')
//             let reason = args.slice(1).join(" ")
//             if (!reason) return message.reply('Da una razón por la cual quieres felicitar a esta persona')

//             db.add(`userthanks_${user.id}`, 1)
//             db.set(`cooldown_${message.author.id}`, Date.now())

//             const felicitación = new MessageEmbed()
//             .setTitle('¡Nueva Felicitación!')
//             .setDescription(`**${message.member.displayName}** Ha felicitado a **${user.displayName}**`)
//             .addField('La razón de la felicitación es:', `${reason}`)
//             .setFooter(message.guild.name, message.guild.iconURL())

//             // const felicitado = new MessageEmbed()
//             // .setTitle('¡Te han felicitado!')
//             // .setDescription(`${message.member.displayName} Te ha felicitado`)      ////WIP
//             // .addField('Te felicito por:', `${reason}`)
        

//             return message.channel.send({embeds: [felicitación]}),
//             user.send(`**¡Te han felicitado!**\n ${message.member.displayName} te ha felicitado por la siguiente razón: ${reason}`)

//     }
// }