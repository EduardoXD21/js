const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "sugerencia",
    
    run: async(client, message, args) => {

        const channel = message.guild.channels.cache.get('873954493342048286')
        let query = args.join(" ");
        if (!query) return message.reply({content: `Debes escribir algo para sugerir`, ephemeral: true})

        const image = message.attachments.first() ? message.attachments.first().proxyURL : null
        
        const sugiriente = message.author.tag
        message.reply({content: `Tu sugerencia ha sido enviada en ${channel}`, ephemeral: true}).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000) 
        })
       
        const sugEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Sugerencia de ${message.author.tag}`)
            .setDescription(`**${query}**`)
            .addFields([
                { name: "Estado:", value: `\`Pendiente ⌛\``, inline: true },
                { name: "Razón:", value: `\`En revisión⏰\``, inline: true },
            ])
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setImage(image)
            .setTimestamp()

            const sugPage = await channel.send({ embeds: [sugEmbed]})

            await sugPage.react('👍')
            await sugPage.react('👎')

    }
}