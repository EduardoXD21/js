const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'report',
  aliases: ['bug'],
  description: 'report a bug ',
  useage: ';;report <bug>',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    const channel = message.guild.channels.cache.get('931030377835950110')
    

    
    const query = args.join(" ");
    if(!query) return message.reply('please specify a bug')


    const reportembed = new MessageEmbed()
      .setTitle('Nuevo Bug!')
      .addField('Autor', message.author.toString())
      .addField('BUG', query) 
      .setTimestamp();

      message.delete()
      message.channel.send(`${message.author} su bug: ${query},  ha sido enviado exitosamente, el staff lo resolvera lo antes posible, gracias por contribuir con el servidor`).then(m => {
        setTimeout(() => {
            m.delete()
        }, 6000) 
    })
   channel.send({embeds: [reportembed]});   
  }
}  