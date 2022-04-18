const client = require('../index.js');
const config = require('../config.json');
const { DiscordAPIError } = require('discord.js');
const Discord = require ('discord.js');

client.on('messageCreate', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

// client.on("interactionCreate", async(interaction) => {
//     if(interaction.isButton()){
//         if(interaction.customId === "tickets"){
//             const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
//             interaction.guild.channels.create(`ticket-${interaction.user.username}`,{
//                 type: "GUILD_TEXT",
//                 parent: "899820486467412008",
//                 permissionOverwrites: [
//                     {
//                   id: interaction.user.id,
//                   allow: ["VIEW_CHANNEL","SEND_MESSAGES"]
//                     },
//                     {
//                         id: everyone.id,
//                         deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
//                     }
//                 ]
                
//             }).then(c => {
//                 const mensaje = new Discord.MessageEmbed()
//                 .setTitle(`Bienvenido, ${interaction.user.username}.`)
//                 .setDescription("En este Ticket podras resolver tus dudas o preguntas etcc")
//                 .setColor("RANDOM")

//                 const row = new Discord.MessageActionRow()
//                 .addComponents(
//                     new Discord.MessageButton()
//                     .setCustomId("delete")
//                     .setStyle("DANGER")
//                     .setLabel("Cerrar Ticket")
//                     .setEmoji("🗑️")
//                 )
//                 interaction.user.send('Tu Ticket ha sido creado exitosamente!');
//                 c.send({ content: `Bienvenido <@${interaction.user.id}> un <@&899385105875894292> te atendera lo antes posible`,
//                   embeds: [mensaje],
//                 components: [row]})
//                 if(interaction.customId == "delete"){
//                     c.delete();
//                 }
//             })
//         }
//     }


// })

// client.on("interactionCreate", async(interaction) => {
//     if(interaction.isButton()){
//         if(interaction.customId === "verificar"){
//             const { Captcha } = require("captcha-canvas")

//             const captcha = new Captcha()
//             captcha.async = false
//             captcha.addDecoy()
//             captcha.drawTrace()
//             captcha.drawCaptcha()

//             const attachment = new Discord.MessageAttachment(captcha.png, "captcha.png")

//             interaction.reply({ content: `<@${interaction.user.id}>, Resuelve este Captcha para ser verificado. (15s)`, files: [attachment], ephemeral: true })

//             const filter = m => m.author.id === interaction.user.id;
//             const collector = interaction.channel.createMessageCollector({filter, time: 15000})

//             collector.on("collect", async m => {
//                 setTimeout(() => {
//                     m.delete()
//                 }, 1000)
//                 if(!m.content.startsWith(captcha.text)){
//                     collector.stop()
//                     m.channel.send("Captcha Incorrecto").then (xd => {
//                         setTimeout(() => {
//                             xd.delete()
//                         }, 3000)
//                     })
//                 }

//                 await  m.member.roles.add("877433630740324392")
//                 m.channel.send(`✅ <@${interaction.user.id}>, verificado correctamente`).then(v =>{
//                     setTimeout(() =>{
//                         v.delete()
//                     }, 3000)
//                 })
//                 collector.stop()
//             })
//         }
//     }})