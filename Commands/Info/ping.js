const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    name: 'ping',
    description: "Sirve para ver la latencia del bot",
    run: async (client, message, args) => {

        const Ping = client.ws.ping;


        const embed = new Discord.MessageEmbed()
            .setTitle('🏓 Ping')
            .setColor('RANDOM')
            .setDescription(`** Hola ${message.author}, el ping del bot es de \`${Ping} ms\`.**`)
            .setFooter('drip$')

            const embed2 = new Discord.MessageEmbed()
            .setTitle('🏓 Ping')
            .setColor('RANDOM')
            .setDescription(`** Alguien actualizo la información, el ping actual es de \`${Ping} ms\`.**`)
            .setFooter('drip$')

        const row = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('1')
                    .setPlaceholder('Actualizar ping 🏓')
                    .addOptions([
                        {
                            label: 'Actualizar!',
                            emoji: '🏓',
                            value: '1',
                        },
                    ])
            )
        message.reply({ embeds: [embed], components: [row] }).then(msg => {
            const filtro = (interaction) =>
                interaction.isSelectMenu()

            const coletor = msg.createMessageComponentCollector({
                filtro
            });
            coletor.on('collect', async (collected) => {
                let ticket = collected.values[0]
                collected.deferUpdate()

                if (ticket === '1') {


                   msg.edit({embeds: [embed2]})


                }
            })
        }) 
    }
}  
