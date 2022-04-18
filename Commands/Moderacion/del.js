const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'del',
    description: "Sirve para borrar mensajes, el maximo a poder borrar son 99 mensajes",
    UserPerms: ['MANAGE_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const channel = message.guild.channels.cache.get('931806798216847411')

        try {
            let delamount = args[0];
            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('Error:')
            if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${message.author} **No tienes permiso para usar este comando.**`);
            if (parseInt(delamount) > 100) return message.reply('Solo puedo borrar 100 mensajes a la vez!')

            const log = new MessageEmbed()
            .setTitle('⚠ Comando !del ejecutado')
            .setDescription(`${message.author} ha borrado **${delamount}** mensajes en ${message.channel}`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor('GOLD')
            .setTimestamp()

            const dele = new MessageEmbed() 
            .setDescription(`${message.author} borraste ${delamount} mensajes`)
            .setColor('RANDOM')
            await message.channel.bulkDelete(parseInt(delamount) + 1, true);

             message.channel.send({embeds: [dele]}).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 3000) 
            })
            channel.send({ embeds: [log] })
        } catch (e) {
            console.log(e)
        } 
    }
}





