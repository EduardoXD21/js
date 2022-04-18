const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../models/warndb');

module.exports = {
    name: 'warn',
    description: "Sirve para warnear o advertir a un usuario",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!user) return message.reply('Mencioname un usuario valido')
        const reason = args.slice(1).join(" ")
        if (!reason) return message.reply('dime una razón')

        warndb.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
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
.setTitle('Nuevo Warn ⚠')
.setDescription(`${user} Ha sido advertido\n> La razón es: **${reason}**`)
.addField('Staff que sancionó:', `${message.author.tag}`)
.setColor('BLUE')

const warneado = new MessageEmbed()
.setTitle('Has sido Warneado ⚠')
.setDescription(`Vaya.. al parecer has incumplido alguna de las normativas del servidor`)
.addField('La razón por la cual fuiste warneado es:', `**${reason}**`)
.setColor('RED')
        message.channel.send({embeds: [embed]})
        user.send({embeds: [warneado]})

    }
}