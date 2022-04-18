const { Collection, Client, Interaction, MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const request = require('request');
// const Voice = require('@discordjs/voice');
const mongoose = require("mongoose")
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

//EXPORTS CLIENT
module.exports = client;


mongoose.connect("mongodb+srv://dripSbot:WY3FbsChgMlZppTQ@dripbot.nrjni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado a la Base de Datos")
}).catch(() => {
    console.log("Ocurrio un error al conectarse a la Base de Datos")
})


//CLIENT MODULES
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.cooldowns = new Collection();
client.config = require("./config.json");
client.logger = require('./Utils/Logger');
// client.emoji = require('./JSON/emoji.json');
client.delay = ms => new Promise(res => setTimeout(res, ms));
client.embedCollection = new Collection();
client.interactions = new Collection();
client.slash_commands = new Collection();
client.prefix = client.config.prefix;

require('./Handlers/slash_commands');
require('./Handlers/command')(client);
require('./Handlers/event')(client);


//HANDLE UNHANDLED REJECTION ERRORS
process.on('unhandledRejection', err => {
    client.logger.error(`Unhandled promise rejection: ${err.message}.`);
    console.log(err);
});


// client.on("ready", async () => {
//     const guild = await client.guilds.fetch("811489511510245416");
//     const connection = joinVoiceChannel({
//         channelId: "856611253433925663",
//         guildId: "811489511510245416",
//         adapterCreator: guild.voiceAdapterCreator
//     })
//   })


// client.on("ready", () => {


//     const Voice = require('@discordjs/voice');
//         const channel = client.channels.cache.get("927740640312315934") // id do canal
//         if(!channel) return console.log("Canal invalido")
//               const guild = client.guilds.cache.get("868775675643981895")// id da guild
//                     if(!guild) return console.log("Guild invalida")
//         let connection = Voice.getVoiceConnection(guild.id);
//         if (!connection) {
//           connection = Voice.joinVoiceChannel({
//             'adapterCreator': guild.voiceAdapterCreator,
//             'channelId': channel.id,
//             'guildId': guild.id,
//             'selfDeaf': false,
//           });
//         }
//   })



///BLOQ LINKS

client.on('messageCreate', async (message) => {
    const db = require("quick.db");
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    let verificando = db.get(`antilink_${message.guild.id}`);
    if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

    if (verificando === "on") {

        const embed = new MessageEmbed()
            .setTitle('⚠ | No se pueden mandar links')
            .setDescription('**El sistema de seguridad antilink esta activado para evitar el spam de links maliciosos destinados a scams o ip loggers**')
            .addField('Persona que mando un link:', `${message.author}`)
            .setThumbnail('https://cdn.discordapp.com/attachments/927442566071320586/928766086441234453/seguridad.gif')
            .setColor('GOLD')

        if (message.member.permissions.has("MANAGE_GUILD")) return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;

        if (message.content.includes("https".toLowerCase()) || message.content.includes("http".toLowerCase()) || message.content.includes("www".toLowerCase()) || message.content.includes(".com".toLowerCase()) || message.content.includes("nitro".toLowerCase()) || message.content.includes(".cl".toLowerCase())) {


            message.delete();
            message.channel.send({ embeds: [embed] }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 120000)
            })

        }
    }
})

///AFK

client.on("messageCreate", (message) => {
    const db = require("quick.db");
    if (message.author.bot) return;

    let pessoa = db.get(`verificando_afk_${message.author.id}`);
    let user = message.author;
    if (message.author.id === pessoa) {
        const desa = new MessageEmbed()
            .setTitle('Modo ocupado desactivado')
            .setDescription(`${message.author} ya no esta ocupado y vuelve a estar disponible`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor('GREEN')
        message.reply({ embeds: [desa] }).then(msg => {
            db.delete(`afk_${message.author.id}`);
            db.delete(`motivo_afk_${message.author.id}`)
            db.delete(`verificando_afk_${message.author.id}`)
        })
    } else {

        let user_afk = message.mentions.members.first();

        if (!user_afk) return;

        let motivo = db.get(`motivo_afk_${user_afk.id}`);
        let afk = db.get(`afk_${user_afk.id}`);
        const eti = new MessageEmbed()
            .setTitle('Modo Ocupado')
            .setDescription(`${message.author} El staff \`${user_afk.user.username}\` actualmente esta ocupado, el motivo es: ${motivo}`)
            .setColor('GOLD')
        if (afk === true) return message.reply({ embeds: [eti] });

    }

})

///BLOQ MALAS PALABRAS

//client.on("messageCreate", (message) => {
//  const bloq = new MessageEmbed()
//      .setTitle('Palabra Bloqueada Detectada')
//     .setDescription(`${message.author} alguna de las palabras que dijiste estan bloqueadas\n\nEste mensaje sera eliminado en: \`3 segundos\``)
//     .setColor('RED')
// .setFooter('Sistema de seguridad')


// if (message.content.includes(`disc`) || message.content.includes(`stea`) || message.content.includes(`raja`) || message.content.includes(`sexo`) || message.content.includes(`@everyone`) || message.content.includes(`server de mierda`)) {
//      message.reply({ embeds: [bloq] }).then(m => {
//         setTimeout(() => {
//              m.delete()
//             message.delete()
//          }, 3000)
//      })

//     const log = new MessageEmbed()
//       .setTitle('Palabra Bloqueada Detectada')
//         .setDescription(`${message.author} ha escrito una palabra bloqueada\n\n Frase: \`${message.content}\``)
//        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))

//     let channel = message.guild.channels.cache.find(channel => channel.name === "log-general");
//     channel.send({ embeds: [log] })
// }
//});

///LOGS DE MALAS PALABRAS

client.on("messageCreate", async (message) => {
    let channel = message.guild.channels.cache.find(channel => channel.name === "log-general");

    const log = new MessageEmbed()
        .setTitle('Palabra Bloqueada Detectada')
        .setDescription(`${message.author} ha escrito una palabra bloqueada\n\n Frase: \`${message.content}\``)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    // .setFooter('Sistema de seguridad')

    if (message.content.includes(`disc`) || message.content.includes(`stea`) || message.content.includes(`raja`) || message.content.includes(`sexo`) || message.content.includes(`raja`) || message.content.includes(`server de mierda`))
        channel.send({ embeds: [log] })
});

///MENCIÓN 

client.on('message', async message => {
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {

        ///Variables matematicas para calcular tiempo UP
        let segundosTotales = (client.uptime / 1000);
        let dias = Math.floor(segundosTotales / 86400);
        segundosTotales %= 86400;
        let horas = Math.floor(segundosTotales / 3600);
        segundosTotales %= 3600;
        let minutos = Math.floor(segundosTotales / 60);
        let segundos = Math.floor(segundosTotales % 60);

        const embed = new MessageEmbed()

            .setTitle('¡Al parecer alguien me ha etiquetado!')
            .setDescription(`¡Hola! Soy [Bot] y cumplo muchas funciones, algunas de estas son, darte la bienvenida, poner el orden con algunos sistemas de seguridad y hasta ayudarte con calculos matematicos con el comando !calculadora\n ¡Dato Extra 👀! Llevo despierto **${dias} Día(s) ${horas} Hora(s) ${minutos} Minutos ${segundos} Segundos **`)
            .setFooter('Mis creadores son: E D U A R D O ✓#7939 y @drip$#0018')
            .setThumbnail('https://media.discordapp.net/attachments/927442566071320586/928072509893517332/robot.gif')
            .setColor('RANDOM')

        message.channel.send({ embeds: [embed] })
    }
})

///STATUS FIVEM

client.on('ready', () => {
    function ServerStatus() {
        const options = {
            url: config.ServerURL
        };

        function callback(error, response, body) {
            const ChannelName = client.channels.cache.find(channel => channel.name === (config.ChannelName))

            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);
                const players = Object.keys(info).length

                ChannelName.messages.fetch(config.MessageID).then(message => {
                    const cone = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setURL('https://cfx.re/join/7mzzba')
                                .setLabel("¡Conectate al servidor!")
                                .setStyle("LINK")
                                .setEmoji("📌")
                        );

                    const StatusMessage = new MessageEmbed()
                        .setTitle('Zenit Life')
                        .setColor('GREEN')
                        .setDescription("**IP:** \`\`\`connect cfx.re/join/7mzzba\`\`\`")
                        .addFields({ name: 'Status del servidor', value: '\`\`\`Online ✅\`\`\`', inline: true }, { name: 'Jugadores', value: `\`\`\`${players}/64\`\`\``, inline: true })
                        .setFooter({ text: 'Ultima actualización:' })
                        .setTimestamp()

                    message.edit({ embeds: [StatusMessage], components: [cone] });
                })

                client.user.setActivity(`${players} Jugadores en el servidor`, { type: 'WATCHING' });
            } else {
                ChannelName.messages.fetch(config.MessageID).then(message => {

                    const cone = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setURL('https://cfx.re/join/7mzzba')
                                .setLabel("¡Conectate al servidor!")
                                .setStyle("LINK")
                                .setEmoji("📌")
                        );
                    const StatusMessage = new MessageEmbed()

                        .setTitle('Zenit Life Status')
                        .setColor('RED')
                        .addFields({ name: 'Status del servidor', value: '\`\`\`Offline ❌\`\`\`', inline: true }, { name: 'Jugadores', value: `\`\`\`0/0\`\`\``, inline: true })
                        .setFooter({ text: 'Ultima actualización:' })
                        .setTimestamp()

                    message.edit({ embeds: [StatusMessage], components: [cone] });
                })
            }
        }
        request(options, callback)
    }
    setInterval(ServerStatus, 15000);
});

// After setting up the bot, you can delete lines 61-70
client.on('messageCreate', function(message) {
    if (message.content === 'statusembed') {

        const cone = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://cfx.re/join/7mzzba')
                    .setLabel("¡Conectate al servidor!")
                    .setStyle("LINK")
                    .setEmoji("📌")
            );

        const statusembed = new MessageEmbed()
            .setTitle('Setup Status del Servidor')
            .setDescription('Ingresa la id de este mensaje en el config.json')

        message.channel.send({ embeds: [statusembed], components: [cone] });
    }
});



//LOG IN DISCORD
client.login(config.token).catch(e => client.logger.error(e.message));