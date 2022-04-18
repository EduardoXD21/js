const db = require('../../models/warndb')
const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'raw',
    description: "Sirve para remover todos los warns de un usuario",
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send('Usuario no encontrado.')
        db.findOne({
            guild: message.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await db.findOneAndDelete({
                    user: user.user.id,
                    guild: message.guild.id
                })
                const todo = new MessageEmbed()
                .setTitle('Todos los warns borrados ⚠')
                .setDescription(`${message.author.tag} ha borrado todos los warns de ${user}`)
                .setColor('YELLOW')
                message.channel.send({embeds: [todo]})
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