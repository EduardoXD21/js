const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "send",
    description: "Sirve para mandar mensajes en formato embed en un canal especifico",

    run: async(client, message, args) => {

        let canal = message.mentions.channels.first()
        if (!canal) return message.channel.send("Debes mencionar un canal!")

        let texto = args.slice(1).join(" ")
        if (!texto) return message.channel.send("Debes escribir un texto!")
        let opciones = texto.split(' .. ')

        const embed = new MessageEmbed()

        .setTitle(opciones[0])
            .setDescription(opciones[1])
            .setFooter(opciones[2])
            .setThumbnail(opciones[3])
            .setColor(opciones[4])

        canal.send({ embeds: [embed] })
        message.delete()

    }

}