// const client = require("../index.js");
// const ms = require("ms");
// const timeSpan = ms("7 days");
// const {MessageEmbed} = require("discord.js");
// const moment = require('moment');
// moment.locale('pt-es') 
// const now = moment();

// client.on("guildMemberAdd", async(member) =>{
//     if(member.guild.id !== "868775675643981895") return; 
//     const createdAt = new Date(member.user.createdAt).getTime();
//     const difference = Date.now() - createdAt;

// const msg = new MessageEmbed()
// .setTitle(`⚠ | Has sido expulsado de Zenit Life`)
// .setDescription(`Hola ${member} por temas de seguridad y prevención a malas intenciones de algunas personas hemos definido que el minimo de días creados que debe tener una cuenta de discord para entrar a nuestro discord debe ser de al menos 1 semana`)
// .setColor('GOLD')
// .setFooter('Sistema de seguridad')

// const log = new MessageEmbed()
// .setTitle("⚠ | Probable cuenta secundaria detectada")
// .setDescription(`El usuario ${member} intento entrar al servidor con una cuenta que fue creada hace menos de 7 días \n\n> **Datos tomados por precaución:**`)
// .addField("ID del usuario", `\`\`\`${member.id}\`\`\``, false)
// .addField("Se unio al Discord el:", `\`\`\`${moment(member.createdAt).format('DD/MM/YYYY HH:mm:ss')}\`\`\``)
// .setColor('GOLD')

// let channel = member.guild.channels.cache.get('928142608990085181');

//     if(difference < timeSpan) {
//         await member.send({embeds: [msg]});
//         await channel.send({embeds: [log]});
//         member.kick("Cuenta Secundaria")
//     }
// });