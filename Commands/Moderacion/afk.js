const Discord = require("discord.js")
const db = require("quick.db")
const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "ocu", 
    description: "Sirve para informarle a la gente que te etiquete que estas ocupado", 

    run: async(client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${message.author} **No tienes permisos para usar este comando.**`).then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000) 
        });

        let motivo = args.slice(0).join(" ");
        if (!motivo) motivo = "No especificado.";

        const afk = new MessageEmbed()
        .setTitle('Modo ocupado activado')
        .setDescription(`${message.author} Actualmente se encuentra ocupado, el motivo es: \`${motivo}\``)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setColor('GOLD')

        message.reply({embeds: [afk]}).then(msg => {
            db.set(`afk_${message.author.id}`, true);
            db.set(`motivo_afk_${message.author.id}`, motivo)
            db.set(`verificando_afk_${message.author.id}`, message.author.id)
        })          
    }
}