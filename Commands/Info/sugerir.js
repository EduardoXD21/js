const {Discord} = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
    name: "sugerir",
    description: "Sirve para sugerir cosas😐",
    cooldown: 1,

    run: async(client, message, args) => {

        let query = args.join(" ");
        if (!query) return message.reply({content: `Debes escribir algo para sugerir`, ephemeral: true})

        const image = message.attachments.first() ? message.attachments.first().proxyURL : null

        const sugEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Nueva Sugerencia")
            .setDescription(`${query}\n\n\`Sugerido por ${message.author.tag}\`\nEstado:\`Pendiente ⌛\``)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setImage(image)
            .setTimestamp()

        const channel = message.guild.channels.cache.get('873954493342048286')

        const row = new MessageActionRow().addComponents(

            new MessageButton()
                .setCustomId("sug-acc")
                .setStyle("SUCCESS")
                .setLabel("Aceptar"),

            new MessageButton()
                .setCustomId("sug-dec")
                .setStyle("DANGER")
                .setLabel("Rechazar"),

        )

        // message.reply({content: `Tu sugerencia ha sido enviada en ${channel}`, ephemeral: true}).then(m => {
        //     setTimeout(() => {
        //         m.delete()
        //     }, 5000) 
        // })

        const sugPage = await channel.send({ embeds: [sugEmbed], components: [row] })

        await sugPage.react('👍')
        await sugPage.react('👎')

        const col = await sugPage.createMessageComponentCollector({
            componentType: "BUTTON"
        })

        col.on("collect", async i => {

            const interactor = i.guild.members.cache.get(i.user.id)

            if (!interactor.permissions.has("MANAGE_GUILD")) return

            if (i.customId === "sug-acc") {

                const accEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Sugerencia aceptada")
                    .setDescription(`Tu sugerencia: **${query}** ha sido **aceptada**`)
                    .addFields([
                        { name: "Aceptada por:", value: `${i.user.tag}`, inline: true },
                        { name: "Aceptada en:", value: `${i.guild.name}`, inline: true },
                    ])
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))

                message.author.send({ embeds: [accEmbed] }).catch(err => {

                    if (err.code !== 50007) return console.log(err)

                })

                col.stop("accepted")

            } else if (i.customId === "sug-dec") {

                const decEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Sugerencia Rechazada")
                    .setDescription(`Tu sugerencia: **${query}** ha sido rechazada. Gracias por contribuir ideas al servidor, todas las sugerencias son buenas, pero tambíen hay algunas un poco mas necesarias o relevantes que otras, de igual forma no te desanimes, ¡puede que la proxima sea **aceptada**!`)
                    .addFields([
                        { name: "Rechazada por:", value: `${i.user.tag}`, inline: true },
                        { name: "Rechazada en:", value: `${i.guild.name}`, inline: true },
                    ])
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))

                message.author.send({ embeds: [decEmbed] }).catch(err => {

                    if (err.code !== 50007) return console.log(err)

                })

                col.stop("declined")

            }

        })

        col.on("end", async (collected, reason, interaction) => {

            if (reason === "accepted") {

                const accEmbed1 = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Nueva Sugerencia")
                    .setDescription(`Sugerencia: ${query}\n\n\`de ${message.author.tag}\`\n Estado:\`Aceptada ✅\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setTimestamp()

                sugPage.edit({ embeds: [accEmbed1], components: [] })

            } else if (reason === "declined") {

                const decEmbed1 = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Nueva Sugerencia")
                    .setDescription(`Sugerencia: ${query}\n\n\`de ${message.author.tag}\`\nEstado:\`Rechazada ❌\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setTimestamp()

                sugPage.edit({ embeds: [decEmbed1], components: [] })

            } 

        })

    }
}