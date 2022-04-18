const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    description: "Sirve para mandar mensajes con formato embed",

    run: (client, message, args) => {

        //var perms = message.member.hasPermission("MANEGE_MESSAGES")
        //if(!perms) return message.channel.send("No tienes suficientes permisos!")

        let texto = args.join(' ');
        if (!texto) return message.channel.send("Debes escribir lo que contiene el embed")
        let opciones = texto.split(' .. ')

        const embed = new Discord.MessageEmbed()

        .setTitle(opciones[0])
            .setDescription(opciones[1])
            .setFooter(opciones[2])
            .setThumbnail(opciones[3])
            .setColor(opciones[4])

        message.channel.send({ embeds: [embed] })

        message.delete()

    }

}