const {Discord} = require('discord.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'dm',
    description: "Sirve para mandarle un dm a una persona directamente desde el bot",
    run: async (client, message, args) =>{

        if (message.member.permissions.has("MANAGE_GUILD")) return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;

        const user = message.mentions.users.first()
        if (!user) return message.reply({ content: 'No, mencionaste a ningun usuario para mandarle el mensaje!' })

        const razon = args.slice(1).join(" ")
        if (!razon) return message.reply({ content: 'Si quieres enviar un mensaje pon un mensaje!' })


const dm = new MessageEmbed()
.setDescription(`Mensaje enviado desde **${message.guild.name}**` )
.addField(`Mensaje:`, `${razon}`)

        user.send({ embeds: [dm] })
    }
}