const discord = require("discord.js");
const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "avatar",
  aliases: ["av", "pfp"],
  category: "Utility",
  usage: "avatar/avatar @user",
  description: "Poder ver los avatar de los usuarios.",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Avatar de ${user.username}`)
      .setDescription(`Presiona los botones para ver las imagenes en grande y poder descargarlas!`)
      .setFooter("Solicitado por "+ message.author.tag, message.author.displayAvatarURL())
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    const row = new MessageActionRow()
        .addComponents([
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "png"})) .setLabel("PNG") .setEmoji('🖼') .setStyle("LINK"),
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg"})) .setLabel("JPG") .setEmoji('🖼') .setStyle("LINK"),
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "webp"})) .setLabel("WEBP") .setEmoji('🖼') .setStyle("LINK"),
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "gif"})) .setLabel("GIF") .setEmoji('🖼') .setStyle("LINK")
        ])

message.channel.send({ embeds: [embed], components: [row]});
    
  },
};