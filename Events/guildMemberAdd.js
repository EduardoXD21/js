const client = require("../index.js");
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const { Captcha } = require ("captcha-canvas");
const InvitesTracker = require("@androz2091/discord-invites-tracker");
const tracker = InvitesTracker.init(client, {
  fetchGuilds: true,
  fetchVanity: true,
  fetchAuditLogs: true,
});

// client.on('guildMemberAdd', async (member) => {

// const captcha = new Captcha();
// captcha.async = true;
// captcha.addDecoy();
// captcha.drawTrace();
// captcha.drawCaptcha();

// const captchaAttachment = new MessageAttachment(
//   await captcha.png,
//   "captcha.png"
// );

// const verify = new MessageEmbed()
// .setTitle("Has sido Verificad@")
// .setThumbnail("https://cdn.discordapp.com/attachments/889977412081840238/920921860076601374/check-mark-verified.gif")
// .setDescription("Felicidades, ya estas verificado")
// .addField('Recuerda:', 'Leer las normas y por sobre todo **¡Divertirte!**')
// .addField('Ya tienes tu rol:', '🏠»Civil')
// .setColor("GREEN")
// .setFooter("🤖» Sistema de seguridad Zenit Life RP💎")


// const captchaEmbed = new MessageEmbed()
//  .setTitle('🤖» Sistema de Seguridad')
// .setDescription("Porfavor completa este Captcha")
// .setFooter('🤖» Recuerda que tambien pueden haber Mayusculas')
// .setImage("attachment://captcha.png");


// const link = new MessageActionRow()
//   .addComponents(
//       new MessageButton()
//       .setCustomId('lol')
//     .setLabel("¡Enviado Desde Zenit Life RP!")
//     .setStyle("SUCCESS")
//     .setEmoji('💎')
//   );

// const msg = await member.send({
//   files: [captchaAttachment],
//   embeds: [captchaEmbed],
//   components: [link],
// });

// const error = new MessageEmbed()
// .setTitle('Error ❌')
// .setDescription('Captcha incorrecto')
// .setColor('RED')
// .setThumbnail('https://cdn.discordapp.com/attachments/889977412081840238/920937504658575370/x.gif')
// .setFooter("🤖» Sistema de seguridad Zenit Life RP💎")
// const filter = (message) => {
//   if(message.author.id !== member.id) return;
//   if(message.content === captcha.text) return true;
//   else member.send({embeds: [error]});
// };

// const adios = new MessageEmbed()
// .setTitle ('¡Has sido **kickeado**!')
// .setDescription('Has fallado muchas veces el codigo o tu tiempo de espera se ha acabado, si deseas unirte nuevamente te dejo una invitación aqui')
// .setColor('RED')
// .setThumbnail('https://cdn.discordapp.com/attachments/889977412081840238/920938907774902282/robot.gif')
// .setFooter("🤖» Sistema de seguridad Zenit Life RP💎")

// try{
// const response = await msg.channel.awaitMessages({
//   filter,
//   max: 1,
//   time: 180000,
//   errors: ["time"],
// });

// if(response) {
//   member.roles.add('925496734325542922');
//   member.send({ embeds: [verify]});
// }
// } catch (err) {
//   await member.send({embeds: [adios], content: 'https://discord.gg/hfBzJVs9ZJ'})
//   member.kick('No has respondido el captcha');
// }


//   // const link = new MessageActionRow()
//   // .addComponents(
//   //     new MessageButton()
//   //     .setCustomId('lol')
//   //   .setLabel("¡Enviado Desde Zenit Life RP!")
//   //   .setStyle("SUCCESS")
//   //   .setEmoji('💎')
//   // );
//   // const canal = '879222839973142558'
//   const embed = new MessageEmbed()
//   .setColor("RANDOM")
//   .setTitle(`**¡Bienvenid@ ${member.displayName}!**`)
//       .setDescription(`¡Gracias por entrar a nuestro discord! **${member.guild.name}**\n\n> **-**Si verificarte con el codigo captcha se te complica y erras en las 3 oportunidades no te preocupes ¡Abajo te dejamos una invitación!`)
//       .addField(`¡Verificate en:`, `<#877433063108378704>!`)
//       // .addField(`Si verificarte con el codigo captcha se te complica y erras en las 3 oportunidades no te preocupes` , `El boton de este mensaje es una invitación para que vuelvas a unirte e intentarlo`)
//       .setThumbnail("https://media.discordapp.net/attachments/916450902758551612/917257656136265748/IMG_1446.png?width=701&height=701")
//       .setFooter('Sistema de bienvenida Zenit Life RP💎 | https://discord.gg/hfBzJVs9ZJ')
//       member.send({ embeds: [embed], components: [link] })
// })

tracker.on("guildMemberAdd", async (member, type, invite) => {
  let channel = member.guild.channels.cache.get("902739903912218644");
  if (type === "normal") {
    const bien = new MessageEmbed()
    .setTitle('Log de Invitaciones')
    .setDescription(`${member}! ha sido invitado por ${invite.inviter}, lleva ${invite.uses} invitaciones`)
    .setColor('GOLD')
    channel.send({embeds: [bien]});
  } else if (type === "unknown") {
    const nada = new MessageEmbed()
    .setTitle('Log de Invitaciones')
    .setDescription( `${member}! No pude ver quien lo invito...`)
    .setColor('GOLD')
    channel.send(
      {embeds: [nada]}
    );
  } else if (type === "vanity") {
    const vani = new MessageEmbed()
    .setTitle('Log de Invitaciones')
    .setDescription( `${member}! Ha entrado con una invitacion vanity`)
    .setColor('GOLD')
    channel.send({embeds: [vani]});
  }
});