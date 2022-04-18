const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../models/warndb')

module.exports = {
    name: 'warnings',
    description: "Sirve para ver los warnings que tiene un usuario",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first() || message.author.id;

        warndb.findOne({
            guild: message.guild.id, 
            user: user.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                const e = data.content.map(
                    (w, i) => `\n\`${i + 1}\` --- Moderador: ${message.guild.members.cache.get(w.moderator).user.tag},  Razón: ${w.reason}`
                )
                const embed = new MessageEmbed()
                    .setDescription(e.join(' '))
                message.channel.send({
                    embeds: [embed]
                })
            } else {
                const nada = new MessageEmbed()
                .setTitle('¡No hay nada por aquí!')
                .setDescription(`${user} No tiene warns`)
                .setColor('GREEN')
                message.channel.send({embeds: [nada]})
            }
        })

    }
}