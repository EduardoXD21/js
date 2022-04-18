const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require('moment');
moment.locale('pt-es')
const now = moment();

module.exports = {
    name: "cone",
    aliases: [],
    description: "Sirve para entrar al servidor desde discord al apretar el boton de este mensaje",
    run: async(client, message, args) => {

        let help = new MessageEmbed()
            .setColor("0x2894C2")

        const look = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setURL('https://cfx.re/join/7mzzba')
                .setLabel("Conectate al servidor!")
                .setStyle("LINK")
                .setEmoji("")
            );

        message.channel.send({ embeds: [help], components: [look] });
        message.delete()

    }
}