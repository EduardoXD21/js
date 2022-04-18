const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require('moment');
moment.locale('pt-es')
const now = moment();

module.exports = {
    name: "rd",
    description: "Sirve para ver las redes sociales del servidor con una conexión rapida",

    run: async(client, message, args) => {

        let web = new MessageButton()
            .setLabel("TikTok")
            .setURL("https://www.tiktok.com/@zenitlife?lang=es")
            .setStyle("LINK")
            .setEmoji("875876054185697311")

        let supp = new MessageButton()
            .setLabel("Instagram")
            .setURL("https://www.instagram.com/zenitlife/")
            .setStyle("LINK")
            .setEmoji("793624331501961227")

        let votar = new MessageButton()
            .setLabel("Facebook")
            .setURL("https://www.facebook.com/ZenitLifeRP")
            .setStyle("LINK")
            .setEmoji("793759936554467338")

        let yt = new MessageButton()
            .setLabel("Youtube")
            .setURL("https://www.youtube.com/channel/UCrtF0qMXkcSoapJger5pL8A")
            .setStyle("LINK")
            .setEmoji("876495945146200114")

        let button = new MessageActionRow()
            .addComponents(web, supp, votar, yt)

        let help = new MessageEmbed()
            .setThumbnail("https://i.imgur.com/2RcaTrZ.png")
            .setTitle("💻 | Redes Sociales")
            .setColor("BLUE")
            .setDescription("Hola buenas, \nEstas son las *Redes sociales* del\nservidor actualmente")
            .addField("TikTok", "@zenitlife")
            .addField("Instagram", "/zenitlife")
            .addField("Facebook", "/ZenitLifeRP")
            .addField("Youtube", "/Zenit Life")
            .setImage("https://i.imgur.com/wp73Woc.gif")

        message.channel.send({ embeds: [help], components: [button] });
        message.delete()

    }
}