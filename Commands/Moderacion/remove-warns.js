const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/warndb')

module.exports = {
    name: 'rw',
    description: "Sirve para remover un warn de un usuario",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase())
        if (!user) return message.channel.send('Usuario no encontrado.')
        db.findOne({
            guild: message.guild.id, 
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                let number = parseInt(args[1]) - 1
                const nan = new MessageEmbed()
                .setTitle('Bip Bop Beep Error')
                .setDescription('El argumento no es un numero valido\n Prueba poniendo el numero del warn que deseas borrar')
                if (isNaN(number)) return message.channel.send({embeds: [nan]})
                data.content.splice(number, 1)
                const borrar = new MessageEmbed()
                .setTitle('Warn Borrado')
                .setDescription(`${message.author.tag} ha removido un warn del usuario ${user}`)
                message.channel.send({embeds: [borrar]})
                data.save()
            } else {
                const nada = new MessageEmbed()
                .setTitle('¡No hay nada por aquí!')
                .setDescription(`${user} No tiene warns`)
                .setColor('GREEN')
                message.channel.send({embeds: [nada]})
            }
        }) // Since the video is becoming very long i will copy paste the code since i have already made it before the video.. the code will be in the description

    }
}