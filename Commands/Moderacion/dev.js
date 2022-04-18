const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "dev",
    description: "Sirve para mandar mensajes con formato embed",

    run: (client, message, args) => {
        if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return;
        //var perms = message.member.hasPermission("MANEGE_MESSAGES")
        //if(!perms) return message.channel.send("No tienes suficientes permisos!")

        let texto = args.join(' ');
        if (!texto) return message.channel.send("Debes escribir lo que contiene el embed")
        let opciones = texto.split(' . ')

        const embed = new Discord.MessageEmbed()

        .setTitle(opciones[0])
            .setDescription(opciones[1])
            .setColor("#5495F3")

        message.channel.send({ embeds: [embed] })

        message.delete()

    }

}