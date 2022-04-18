const Discord = module.require("discord.js");

module.exports = {
  name: "sancion1m",
  author: "Ned",
  description: "Sirve para informar la sanción de un usuario, su razón y con la duración de 1 mes",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    let mensaje = args.slice(1).join(" ");
    if (!mensaje) {
      return message.channel.send("Debes escribir algo");
    }
    if (!member) {
      return message.channel.send("Debes mencionar a alguien");
    }

    const embed = new Discord.MessageEmbed()
    .setTitle('**Informe de Sanción**')
      .setDescription(`El/La usuario **${member.user}** ha sido sancionado/a por **${mensaje}**`)
      .setFooter('Sistema de sanciones | Zenit Life.RP')
      .addField(`Duración: `, '1 Mes')
      .setColor("RED");

    message.channel.send({ embeds: [embed] });
    message.delete();

    member.user.send(`Has recibido una sancion, motivo: ${mensaje}, Duración: 1 Mes`)
  },
};

