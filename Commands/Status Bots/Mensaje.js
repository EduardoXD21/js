const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "stats",
    
    run: async(client, message, args) => {

        const channel = message.guild.channels.cache.get('841237714060967936')

       
        const statsembed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Status de Bots`)
            .setDescription(`Bot Multiproposito: <a:on:935046507604885554> \n\n Bot de Tickets: <a:on:935046507604885554>\n\n`)
            .addFields([
                { name: "Funcionando", value: `<a:on:935046507604885554>`, inline: true },
                { name: "En Mantención", value: `<a:working:935047818907901974>`, inline: true },
                { name: "Apagado", value: `<a:off:935046507227402390>`, inline: true },
            ])
            .setTimestamp()

            const sugPage = await channel.send({ embeds: [statsembed]})

    }
}