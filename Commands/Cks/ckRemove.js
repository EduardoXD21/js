const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/ckdb')

module.exports = {
    name: 'rck',
    description: "Sirve para remover el registro de un ck",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, Discord) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase())
        const embedpe = new MessageEmbed()
            .setDescription("Le hace falta mencionar a usuario")
            .setColor("RED")
        if (!user) return message.reply({ embeds: [embedpe] })
        db.findOne({
                guild: message.guild.id,
                user: user.user.id
            }, async(err, data) => {
                if (err) throw err;
                if (data) {
                    let number = parseInt(args[1]) - 1
                    const embednumber = new MessageEmbed()
                        .setDescription("Le hace falta poner un número para quitarle el ck, si no se acuerda del número del ck que quiere eliminar ponga el comando (!cks) para ver los numeros del ck")
                        .setColor("RED")
                    if (isNaN(number)) return message.channel.send({ embeds: [embednumber] })
                    data.content.splice(number, 1)
                    const embedad = new MessageEmbed()
                        .setDescription('Ck borrado')
                        .setColor("NAVY")
                    message.channel.send({ embeds: [embedad] })
                    data.save()
                } else {
                    const embed = new MessageEmbed()
                        .setDescription("Este usuario no contiene ningun ck en este servidor.!")
                        .setColor("RED")
                    message.channel.send({ embeds: [embed] })
                }
            }) // Since the video is becoming very long i will copy paste the code since i have already made it before the video.. the code will be in the description

    }
}