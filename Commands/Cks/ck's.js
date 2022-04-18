const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const ckdb = require('../../models/ckdb')

module.exports = {
    name: 'cks',
    description: "Sirve para ver todos los cks que tiene un usuario",
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
        ckdb.findOne({
            guild: message.guild.id,
            user: user.id
        }, async(err, data) => {
            if (err) throw err
            if (data) {
                const e = data.content.map(
                    (w, i) => `\n\`${i + 1}\` --- Usuario: ${user} ,  Razón del ck: ${w.reason}`
                )
                const embed = new MessageEmbed()
                    .setDescription(e.join(' '))
                    .setColor("DARK_PURPLE")
                message.channel.send({
                    embeds: [embed]
                })
            } else {
                const embed2 = new MessageEmbed()
                    .setDescription('Este usuario no contiene ningun ck')
                    .setColor("DARK_RED")
                message.channel.send({
                    embeds: [embed2]
                })
            }
        })

    }
}