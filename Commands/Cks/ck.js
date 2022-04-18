const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const ckdb = require('../../models/ckdb');

module.exports = {
    name: 'ck',
    description: "Sirve para crear el registro de un nuevo ck",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, Discord) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const embeduser = new MessageEmbed()
            .setDescription(`Le hace falta mencionar a usuario`)
            .setColor("RED")
        if (!user) return message.reply({ embeds: [embeduser] })
        const reason = args.slice(1).join(" ")
        const embedreason = new MessageEmbed()
            .setDescription(`Le hace falta la razón`)
            .setColor("RED")
        if (!reason) return message.reply({ embeds: [embedreason] })


        ckdb.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async(err, data) => {
            if (err) throw err;
            if (!data) {
                data = new ckdb({
                    guild: message.guild.id,
                    user: user.user.id,
                    content: [{
                        moderator: message.author.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(object)
            }
            data.save()

        })

        const embed = new MessageEmbed()

        .setTitle("CK Aprobado y Pj eliminado")
            .setDescription(`Usuario con ck:${user}, Razón del ck: ${reason}`)
            .setFooter("CK REALIZADO | PJ BORRADO | SI NO TIENE NINGUNA DUDA SE PROCEDERA A CERRAR EL TICKET, QUE TENGA UN GRAN DIA")
            .setColor("RANDOM")

        message.channel.send({ embeds: [embed] })

        const channel = message.guild.channels.cache.get('935782364695650384')

        const log = new MessageEmbed()

        .setTitle("Sistema de logs, Comando usado: !ck")
            .setDescription(`${message.author} acaba de usar el comando !ck hacia el usuario ${user} por la razón: **__${reason}__**`)
            .setThumbnail(message.author.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp()
        channel.send({ embeds: [log] })

    }
}