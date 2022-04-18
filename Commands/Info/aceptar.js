const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "aceptar",
    run: async(client, message, args) => {

                if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${message.author} **No tienes permisos para usar este comando.**`).then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000) 
        });
                const messageID = args[0]
                if (isNaN(parseInt(args[0]))) return message.reply('La ID no son numeros')
                const accecptedmsg = args.slice(1).join(' ')
                if (!accecptedmsg) return message.reply(`¿Por que fue aceptada?`)

                try {
                    const channel = message.guild.channels.cache.get('873954493342048286') 
                    const sugEmbed = await channel.messages.fetch(messageID) 
                    const data = sugEmbed.embeds[0] 
                    const image = message.attachments.first() ? message.attachments.first().proxyURL : null
                    const embed = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`${data.title}`)
                        .setDescription(`**${data.description}**`)
                        .addFields([
                            { name: "Estado:", value: `\`Aceptada ✅\``, inline: true },
                            { name: "Razón:", value: `\`${accecptedmsg}\``, inline: true },
                        ])
                       .setFooter(`Aprobada por ${message.author.tag}`)
                        sugEmbed.edit({ embeds: [embed], components: [] })

                } catch (e) {
                    message.reply(`Ocurrio un error, prueba denuevo`)
                }
    }
}