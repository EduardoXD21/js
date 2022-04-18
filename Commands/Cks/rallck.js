const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/ckdb')

module.exports = {
    name: 'rallck',
    description: "Sirve para quitar los registros de ck de un usuario",
    run: async(client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const embedg = new MessageEmbed()
            .setDescription("Usuario no encontrado.")
            .setColor("RED")
        if (!user) return message.channel.send({ embeds: [embedg] })
        db.findOne({
                guild: message.guild.id,
                user: user.user.id
            }, async(err, data) => {
                if (err) throw err;
                if (data) {
                    await db.findOneAndDelete({
                        user: user.user.id,
                        guild: message.guild.id
                    })
                    const embedy = new MessageEmbed()
                        .setDescription("Borraste todas los cks del usuario")
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedy] })
                } else {
                    const embedk = new MessageEmbed()
                        .setDescription("Este usuario no contiene ningun ck en este servidor.!")
                        .setColor("RED")
                    message.channel.send({ embeds: [embedk] })
                }
            }) // lets try it :D

        const channel = message.guild.channels.cache.get('935782364695650384')

        const log = new MessageEmbed()

        .setTitle("log-rallck")
            .setDescription(`${message.author} de eliminar los ck del ${user}`)
            .setThumbnail(message.author.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp()
        channel.send({ embeds: [log] })

    }
}