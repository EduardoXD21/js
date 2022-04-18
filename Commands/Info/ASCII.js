const Discord = require("discord.js"); 
const { DiscordAPIError } = require('discord.js')
const figlet = require('figlet') //npm i figlet

module.exports = {
    name: "ascii",
    aliases: ["ascii"],
    description: 'Convierte una palabra en codigo ASCII.',

  run: function(client, message, args) {
    message.delete()


    const msg = args.join(' ')

    figlet.text(msg, function(err, data) {
      if (err) {
        console.log('Hubo un error')
        console.dir(err)
      }
      if (data.length > 2000) return message.channel.send('**Envia un texto com menos de 2000 caracteres!**')

      const ascii = new Discord.MessageEmbed()
      .setDescription(`\`\`\`${data}\`\`\``)
      .setColor(process.env.COR)

      message.channel.send({ embeds: [ascii] })
    })
  },
}