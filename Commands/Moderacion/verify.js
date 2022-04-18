//
//const Discord = module.require("discord.js");
// feito por NED#6325
//module.exports = {
//name: "verificar",

//run: async (client, message, args) => {

//let r2 = Math.floor((Math.random() * 98) + 1);

//const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//const alphabet2 = "abcdefghijklmnopqrstuvwxyz"

//let r1 =  alphabet[Math.floor(Math.random() * alphabet.length)]

//let r5 =  alphabet[Math.floor(Math.random() * alphabet.length)]

//let r3 = alphabet2[Math.floor(Math.random() * alphabet2.length)]

//let r4 = Math.floor((Math.random() * 80) + 1);

//let user = message.mentions.members.first() ||  message.author; 

//let embed = new Discord.MessageEmbed()
//.setDescription(`${user}, Escribe este codigo para verificarte, tienes 2 minutos!\n\n\`\`\`${r1}${r2}${r3}${r4}${r5}\`\`\``)
//.setColor('BLUE')

//let embed2 = new Discord.MessageEmbed()
//.setDescription(`El codigo no es correcto, intentalo otra vez`)
//.setColor('RED')

//let embed3 = new Discord.MessageEmbed()
//.setDescription(`${user} Has sido verificado`)
//.setColor('GREEN')

//let tiempo = new Discord.MessageEmbed()
//.setDescription(`${user} Los 2 minutos se han acabado`)
//.setColor('BLUE')

//message.channel.send({embeds: [embed]}).then(m => {
// setTimeout(() => {
//   m.delete()
// }, 120000) 
//})

//setTimeout(() => {
//  message.channel.send({embeds: [tiempo]}).then(m => {
//      setTimeout(() => {
//         m.delete()
//  }, 7000) 
//  })
//}, 120000)

//let role = message.guild.roles.cache.find(role => role.name === "pene") 


//let result = (`${r1}${r2}${r3}${r4}${r5}`)

//const collector = new Discord.MessageCollector(message.channel, m => m.author.id === user.id, { time: 120000 });
//       collector.on('collect', message => {
//        let res = message.content
//      if(res === result) { 
//               message.channel.send({embeds: [embed3]}).then(m => {
//            setTimeout(() => {
//                  m.delete()
//        }, 7000) 
//      })
//            message.member.roles.add(role); }

//           if(res === result) {message.delete()}
// if(!res !== result) message.channel.send({embeds: [embed2]});     
//     })

//       message.delete()

//}
//};