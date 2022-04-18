const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "statse",
    run: async(client, message, args) => {

                if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${message.author} **No tienes permisos para usar este comando.**`).then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000) 
        });
                const messageID = args[0]
                if (isNaN(parseInt(args[0]))) return message.reply('La ID no son numeros')
                const estadobot = args.slice(1).join(' ')
                if (!estadobot) return message.reply(`Estado del bot`)

                try {
                    const channel = message.guild.channels.cache.get('841237714060967936') 
                    const statsembed = await channel.messages.fetch(messageID) 
                    const data = statsembed.embeds[0] 

                    const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`${data.title}`)
                    .setDescription(`${estadobot}`)
                    .addFields([
                        { name: "Funcionando", value: `<a:on:935046507604885554>`, inline: true },
                        { name: "En Desarrollo", value: `<a:working:935047818907901974>`, inline: true },
                        { name: "Apagado", value: `<a:off:935046507227402390>`, inline: true },
                    ])
                   .setTimestamp()
                   statsembed.edit({ embeds: [embed], components: [] })
                } catch (e) {
                    message.reply(`Ocurrio un error, prueba denuevo`)
                }
    }
}