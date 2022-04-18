const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "vip",
    author: "drip$",
    description: "Sirve para ver la info, forma de pago y mas sobre todos los vips",

    run: async(client, message, args) => {

        let embed_1 = new Discord.MessageEmbed()
            .setColor("GOLD")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Hola ${message.author}, aquí tienes la información sobre los Vips del servidor:**`);

        let painel = new MessageActionRow().addComponents(new MessageSelectMenu()
            .setCustomId('menu')
            .setPlaceholder('Información 💎.') // Mensagem estampada
            .addOptions([{
                    label: 'Inicio',
                    description: 'Vuelve al panel inicial',
                    emoji: '📒',
                    value: 'painel_inicial',
                },
                {
                    label: 'Información de Pago',
                    description: 'Ve las informaciónes de pago',
                    emoji: '883514650153607168',
                    value: 'infopago',
                },
                {
                    label: 'VIP 1',
                    description: 'VIP Atenea',
                    emoji: '🗡️',
                    value: 'utilidade',
                },
                {
                    label: 'VIP 2',
                    description: 'VIP Afrodita',
                    emoji: '🌸',
                    value: 'moderacao',
                },
                {
                    label: 'VIP 3',
                    description: 'VIP Zeus',
                    emoji: '⚡',
                    value: 'diversao',
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
                        .setTitle('Pago💸')
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`**Cuenta Rut: \n - Nombre: Marcelo Ignacio Castro Feliú \n- Rut: 19.841.941-9\n - Cuenta : 19.905.681-6\n - Email: comunidadrp2021@gmail.com**`);

                    msg.edit({ content: `${message.author}`, embeds: [embed_p], components: [painel] });

                };


                if (valor === 'utilidade') {

                    let embed_2 = new Discord.MessageEmbed()
                        .setColor("#65ce6e")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("**VIP ATENEA 🗡️ - 5.000 CLP**")
                        .setDescription("25% de descuento en la compra de cualquier casa (blips que esten en el mapa).\n\n10.000 Dinero IC.\n\nSkin para armas.\n\nAuto a eleccion del catalogo VIP o concensionario (independiente del stock) con coste 40.000 IC.\n\n1 tiro en la ruleta de la suerte Atenea.\n\nTuneo turbo.\n\nRango permanente donador en discord.\n\nRango mensual VIP Atenea.")

                    msg.edit({ content: `${message.author}`, embeds: [embed_2], components: [painel] });

                };

                if (valor === 'moderacao') {

                    let embed_3 = new Discord.MessageEmbed()
                        .setColor("#e039b8")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("**VIP AFRODITA 🌸 - 10.000 CLP**")
                        .setDescription("50% de descuento en la compra de cualquier casa (blips que esten en el mapa).\n\n15.000 Dinero IC.\n\nSkin para armas. \n\nAuto Sport o Super por un Coste 30.000 IC  (independiente del stock).\n\nAuto del catalogo VIP por un coste 30.000 IC.\n\nTuneo turbo o motor nivel 2.\n\nLuces personalizadas para 3 vehiculos (colores).\n\n50% descuento en la compra de cualquier bote.\n\n1 tiro en la ruleta de la suerte Afrodita.\n\nRango permanente donador en discordn\n\nRango mensual VIP Afrodita.")

                    msg.edit({ content: `${message.author}`, embeds: [embed_3], components: [painel] });

                };

                if (valor === 'diversao') {

                    let embed_4 = new Discord.MessageEmbed()
                        .setColor("#e2f83d")
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("**VIP ZEUS ⚡ - 15.000 CLP**")
                        .setDescription("60% de descuento en la compra de cualquier casa (se añade la posibilidad de escoger ubicación de la casa).\n\nPosibilidad de rolear con un PED.\n\n25.000 Dinero IC.\n\nSkin para armas.\n\nCualquier auto del concesionario (independiente del stock) o catalogo VIP por un coste 30.000 IC\n\nTuneo turbo y motor nivel 2.\n\nLuces personalizadas para 5 vehiculos (colores).\n\n1 tiro en la ruleta de la suerte Zeus. Auto GTA5Mods coste. Ambos por 40.000 IC.\n\n50% descuento en la compra de cualquier bote.\n\n50% descuento en cualquier avioneta/helicoptero con prioridad en curso de aviación.\n\nRango permanente donador en discord.\n\nRango mensual VIP Zeus.")

                    msg.edit({ content: `${message.author}`, embeds: [embed_4], components: [painel] });

                };

            })

        })

    }
}