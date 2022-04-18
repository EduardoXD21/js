const Discord = require("discord.js");
const ms = require("ms"); // // npm i ms

module.exports = {
    name: "giveaway",
    aliases: ["gw"],
    description: 'Sirve para crear sorteos!',

    run: async(client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply('> **No tienes permiso para usar este comando!**').then(m => {
        setTimeout(() => {
            m.delete()
        }, 10000) // 10 segundos
      })

    const canal = message.mentions.channels.first();
    const tempo = args[0]
    const prémio = args.slice(2).join(" ");

    const erro1 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`${message.author}  \`!giveaway [tiempo] + [canal] + [premio]\``)

    const erro2 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`${message.author} el tiempo debe tener el siguiente formato: 1d, 1h ou 1m, D = Dia / H = Hora / M = Minuto.`)

    const erro3 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`${message.author} debes mencionar un canal específico!  \`!giveaway [tiempo] + [canal] + [premio]\``)

    const erro4 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`${message.author} tienes que agregar un premio!  \`!giveaway [tiempo] + [canal] + [premio]\``)


    if (!args[0]) {
        return message.channel.send({ embeds: [erro1] }).then(m => {
          setTimeout(() => {
              m.delete()
          }, 5000) // 5 segundos
        })
    }

    if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
        return message.channel.send({ embeds: [erro2] }).then(m => {
          setTimeout(() => {
              m.delete()
          }, 5000) // 5 segundos
        })
    }

    if (isNaN(args[0][0])) {
        return message.channel.send({ embeds: [erro3] }).then(m => {
          setTimeout(() => {
              m.delete()
          }, 5000) // 5 segundos
        })
    }

    if (!canal) {
        return message.channel.send({ embeds: [erro3] }).then(m => {
          setTimeout(() => {
              m.delete()
          }, 5000) // 5 segundos
        })
    }

    if (!prémio) {
        return message.channel.send({ embeds: [erro4] }).then(m => {
          setTimeout(() => {
              m.delete()
          }, 5000) // 5 segundos
        })
    }

    const start = new Discord.MessageEmbed()
    .setTitle(prémio)
    .setDescription(`¡Reacciona con 🎉 para participar!\n Termina en: ||**${tempo}**||\nIniciado por: **${message.author}**`)
    .setTimestamp(Date.now() + ms(args[0]))
    .setFooter('Termina :')
    .setColor(process.env.COR);

    const finish = new Discord.MessageEmbed()
    .setTitle(prémio)
    .setDescription(`No hay suficientes participantes para determinar un ganador.!\nIniciado por: **${message.author}**`)
    .setColor('RANDOM')

    const m = await canal.send({ content: `🎉   **GIVEAWAY**   🎉`, embeds: [start] })
    m.react("🎉");

    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        return canal.send({ content: `🎉   **GIVEAWAY TERMINADO**   🎉`, embeds: [finish]});
      }

    const decisão = m.reactions.cache
    .get("🎉")
    .users.cache.filter((u) => !u.bot)
    .random();

    const vencedor = new Discord.MessageEmbed()
    .setDescription(`Ganador: ${decisão}!`)
    .setColor('RANDOM')
      canal.send({ content: `Felicidades ${decisão}! Ganaste  **${prémio}**`, embeds: [vencedor] });
    }, ms(args[0]));
},
}