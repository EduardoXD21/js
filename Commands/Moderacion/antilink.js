const Discord = require("discord.js");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js")
module.exports = {

    name: "antilink",
    author: "drip$",
    description: "Sirve para evitar links maliciosos, se debe activar para que funcione",

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`No tienes permisosde \`Administrador del Servidor\`.`);

        if (!args[0] || args[0] !== "on" && args[0] !== "off")  message.reply(`Activa el sistema con \`!antilink on\`.\nDesactiva el sistema con \`!antilink off\`.`);

        if (args[0] === "on") {
        const activado = new MessageEmbed()
        .setTitle('⚠ | Sistema Antilink Activado')
        .setDescription(`${message.author} ha activado esta función`)
        .setThumbnail('https://cdn.discordapp.com/attachments/927442566071320586/928766694145544282/sec.gif')
        .setColor('GREEN')
            db.set(`antilink_${message.guild.id}`, "on");
            message.reply({embeds: [activado]});

        };

        if (args[0] === "off") {
            const desactivado = new MessageEmbed()
            .setTitle('⚠ | Sistema Antilink Desactivado')
            .setDescription(`${message.author} ha desactivado esta función`)
            .setThumbnail('https://cdn.discordapp.com/attachments/927442566071320586/928766694145544282/sec.gif')
            .setColor('GOLD')
            db.set(`antilink_${message.guild.id}`, "off");
            message.reply({embeds: [desactivado]});

        };

    }
}
