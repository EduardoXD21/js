const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "ex",
    author: "Eduardo",
    description: "Sirve para ver la info, warns, cks, slowmode, lock",

    run: async(client, message, args) => {

        let embed_1 = new Discord.MessageEmbed()
            .setColor("GOLD")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Hola ${message.author}, aquí tienes la información sobre warn, ck, slowmode, lock.**`);

        let painel = new MessageActionRow().addComponents(new MessageSelectMenu()
            .setCustomId('menu')
            .setPlaceholder('Información warns, cks, slowmode, lock.') // Mensagem estampada
            .addOptions([{
                    label: 'Inicio',
                    description: 'Vuelve al panel inicial',
                    emoji: '📒',
                    value: 'painel_inicial',
                },
                {
                    label: 'warns',
                    description: 'Ver las información de warns',
                    emoji: '883611715529486340',
                    value: 'infopago',
                },
                {
                    label: 'cks',
                    description: 'Ver las información de cks',
                    emoji: '☠️',
                    value: 'utilidade',
                },
                {
                    label: 'slowmode',
                    description: 'Ve las información de slowmode',
                    emoji: '883796066498146384',
                    value: 'moderacao',
                },
                {
                    label: 'lock',
                    description: 'Ver las Información de lock',
                    emoji: '🔐',
                    value: 'diversao',
                },
                {
                    label: 'ocu',
                    description: 'Ver las Información de ocu',
                    emoji: '📍',
                    value: 'okey',
                },
                {
                    label: 'embed',
                    description: 'Ver las Información de embed',
                    emoji: '📝',
                    value: 'hola',
                },
                {
                    label: 'giveaway',
                    description: 'Ver las Información de giveaway',
                    emoji: '🎉',
                    value: 'give',
                },
                {
                    label: 'send-channel',
                    description: 'Ver las Información de giveaway',
                    emoji: '📝',
                    value: 'send',
                },
            ])

        );


        message.reply({ content: `${message.author}`, embeds: [embed_1], components: [painel] }).then(msg => {

            const filtro = (interaction) =>
                interaction.isSelectMenu()

            const coletor = msg.createMessageComponentCollector({
                filtro
            });

            coletor.on('collect', async(collected) => {

                let valor = collected.values[0]
                collected.deferUpdate()

                if (valor === 'painel_inicial') {

                    msg.edit({ content: `${message.author}`, embeds: [embed_1], components: [painel] });

                };

                if (valor === 'infopago') {

                    let embed_p = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setTitle('Sistema de warn')
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`La funcion del warn es asi:\n!warn @user mensaje\nEjemplo:\n!warn @eduardo Por realizar un dm\nDe esta manera se le mandara un warn a la persona mencionada\n\nLa funcion de warnigs es asi:\n!warnings @user \nEjemplo:\n!warnings @eduardo\nDe esta manera les mostraran los warns con los numeros\n\nLa funcion de Remove Warns es asi:\n!rw @user Numero(!warnings)\nEjemplo:\n!rw @eduardo 1\nDe esta manera se eliminara el warn del numero ya puesto\n\nLa funcion de Revome All Warnings es asi:\n!raw @user\nEjemplo:\n!raw @eduardo\nDe esta manera se eliminaran todo los warn de la persona mencionada.`);

                    msg.edit({ content: `${message.author}`, embeds: [embed_p], components: [painel] });

                };


                if (valor === 'utilidade') {

                    let embed_2 = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("Sistema de ck")
                        .setDescription("La funcion del ck es asi:\n!ck @user mensaje\nEjemplo:\n!ck @eduardo | CK Aprobado el 07-01-2021 | Nombre pj: Mia Leach | Nombre ds: Xelolo#0479 | Tipo de ck: CK Voluntario. |\nDe esta manera se realizara el ck a la persona\n\nLa funcion de cks es asi:\n!cks @user \nEjemplo:\n!cks @eduardo\nDe esta manera les mostraran los cks con los numeros\n\nLa funcion de Ck Remove es asi:\n!rck @user Numero(!cks)\nEjemplo:\n!rck @eduardo 1\nDe esta manera se eliminara el warn del numero ya puesto\n\nLa funcion de Revome All CKS es asi:\n!rallck @user\nEjemplo:\n!rallck @eduardo\nDe esta manera se eliminaran todo los ck de la persona mencionada.")

                    msg.edit({ content: `${message.author}`, embeds: [embed_2], components: [painel] });

                };

                if (valor === 'moderacao') {

                    let embed_3 = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("Sistema de slowmode")
                        .setDescription("La funcion de slowmode es asi:\n!slowmode 10s\nTiene que llevar el minuto(m) o segundo(s) o hora(h)")

                    msg.edit({ content: `${message.author}`, embeds: [embed_3], components: [painel] });

                };

                if (valor === 'diversao') {

                    let embed_4 = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("Sistema de lock")
                        .setDescription("La funcion de lock es asi:\n!lock Asi se bloquea por 15m\nTambien puedes poner cuanto tiempo puedes bloquiar el canal de la siguente forma\n!lock 10m\nTiene que llevar el minuto(m) o segundo(s) o hora(h)")

                    msg.edit({ content: `${message.author}`, embeds: [embed_4], components: [painel] });

                };

                if (valor === 'okey') {

                    let embed_5 = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("Sistema de ocu")
                        .setDescription("La funcion de ocu es asi:\n!ocu mensaje\nEjepmlo:\n!ocu Programando Bots\nEste avisara que estas ocuapdo\nCada persona que te mencione le mandara un mensjae que estas ocupado por la razón Programando Bots\n\nPara quitarte el ocupado tienes que escribir cualquier palabra o letra en cualquier canal y avisara que ya estas disponible")

                    msg.edit({ content: `${message.author}`, embeds: [embed_5], components: [painel] });

                };

                if (valor === 'hola') {

                    let embed_6 = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("Sistema de embed")
                        .setDescription("La funcion de embed es asi:\n!embed [Titulo] .. [Descripcion] .. [Footer Letras pequeñas] .. [Imagen] .. [color]\nEjemplo:\n!embed Sistema de ck .. El sistema de ck es la forma mas bonita de ckiarte .. https://i.imgur.com/57gxp3p.gif .. RED\nEsto se mandara en el canal que se puso el comando !embed")

                    msg.edit({ content: `${message.author}`, embeds: [embed_6], components: [painel] });

                };

                if (valor === 'send') {

                    let embed_7 = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("Sistema de send")
                        .setDescription("La funcion de send es asi:\n!send [Canal] [Titulo] .. [Descripcion] .. [Footer Letras pequeñas] .. [Imagen] .. [color]\nEjemplo:\n!send #pruebas Sistema de ck .. El sistema de ck es la forma mas bonita de ckiarte .. https://i.imgur.com/57gxp3p.gif .. RED\nEsto se mandara en el canal que mencionaste anteriormente")

                    msg.edit({ content: `${message.author}`, embeds: [embed_7], components: [painel] });

                };

                if (valor === 'give') {

                    let embed_8 = new Discord.MessageEmbed()
                        .setColor("GOLD")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("Sistema de giveaway")
                        .setDescription("La funcion de giveaway es asi:\n!giveaway [tiempo] + [canal] + [premio]\nEjemplo:\n!giveaway 5m + #premios + discord nitro\nEsto se manda un giveaway en el canal mencionado ")

                    msg.edit({ content: `${message.author}`, embeds: [embed_8], components: [painel] });

                };

            })

        })

    }
}