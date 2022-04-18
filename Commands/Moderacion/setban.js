const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "setban",
  description: "Sirve para establecer el canal donde se mandaran los logs de bans",

  run: async(client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${message.author} **No tienes permiso para usar este comando.**`);

    if(!args[0]) return message.reply('**Tienes que determinar un canal!**')
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) return message.reply('**Tienes que determinar un canal!**')
    let id = channel.id

    let sucess = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: | Canal de Bans establecido con exito!`)
    .setColor("GREEN")
    .setDescription(`🔨 | El nuevo canal de bans es ${channel}`)

    message.reply({embeds: [sucess]})

    db.set(`${message.guild.id}_channelID`,id)

  }

}