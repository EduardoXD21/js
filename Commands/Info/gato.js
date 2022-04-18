const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const xPlaying = new Set()

module.exports = {
    name: "gato",
    aliases: ["ttt", "xox"],
    description: "Starts a game of tic-tac-toe with another user.",
    run: async (client, message, args) => {
        const opponent = message.mentions.members.first()

        if (!message.guild.me.permissions.has("ADMINISTRATOR")) return

        if (!opponent) {
            return message.reply("Menciona a alguien para jugar.").catch((err) => { })
        }
        if (opponent.user.id === message.author.id) {
            return message.reply("No puedes jugar al gato contra ti mismo.").catch((err) => { })
        }
        if (opponent.user.bot) {
            return message.reply("No puedes jugar contra un bot, ¡Te ganaria en 3 segundos!").catch((err) => { })
        }

        if (xPlaying.has(message.author.id)) return message.reply(`¡Uno de ustedes ya está en un partido! ¡Completa ese partido primero para comenzar un nuevo partido!`)
        if (xPlaying.has(opponent.user.id)) return message.reply(`¡Uno de ustedes ya está en un partido! ¡Completa ese partido primero para comenzar un nuevo partido!`)

        xPlaying.add(message.author.id)
        xPlaying.add(opponent.user.id)

        let a1 = '⬜'
        let a2 = '⬜'
        let a3 = '⬜'
        let a4 = '⬜'
        let a5 = '⬜'
        let a6 = '⬜'
        let a7 = '⬜'
        let a8 = '⬜'
        let a9 = '⬜'

        const new1 = new MessageActionRow().addComponents(
            grey1 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey1")
                .setEmoji("➖"),

            grey2 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey2")
                .setEmoji("➖"),

            grey3 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey3")
                .setEmoji("➖"),
        )

        const new2 = new MessageActionRow().addComponents(
            grey4 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey4")
                .setEmoji("➖"),

            grey5 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey5")
                .setEmoji("➖"),

            grey6 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey6")
                .setEmoji("➖"),
        )

        const new3 = new MessageActionRow().addComponents(
            grey7 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey7")
                .setEmoji("➖"),

            grey8 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey8")
                .setEmoji("➖"),

            grey9 = new MessageButton()
                .setStyle("SECONDARY")
                .setCustomId("grey9")
                .setEmoji("➖"),
        )

        const embed = new MessageEmbed()
            .setTitle("Juego Gato!")
            .setDescription(`**${message.author.tag} versus ${opponent.user.tag}**`)
            .setColor("RANDOM")

        const initial = await message.reply({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })



        const xcollector = initial.createMessageComponentCollector({
            componentType: "BUTTON",
        })

        xcollector.on("collect", async (interaction) => {
            if (xPlaying.has(message.author.id)) {
                if (interaction.user.id === message.author.id) {
                    if (interaction.customId === "grey1") {
                        new1.components[0].setStyle("PRIMARY").setEmoji("❌").setCustomId("x1").setDisabled(true)
                        a1 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey2") {
                        new1.components[1].setStyle("PRIMARY").setEmoji("❌").setCustomId("x2").setDisabled(true)
                        a2 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey3") {
                        new1.components[2].setStyle("PRIMARY").setEmoji("❌").setCustomId("x3").setDisabled(true)
                        a3 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey4") {
                        new2.components[0].setStyle("PRIMARY").setEmoji("❌").setCustomId("x4").setDisabled(true)
                        a4 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey5") {
                        new2.components[1].setStyle("PRIMARY").setEmoji("❌").setCustomId("x5").setDisabled(true)
                        a5 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey6") {
                        new2.components[2].setStyle("PRIMARY").setEmoji("❌").setCustomId("x6").setDisabled(true)
                        a6 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey7") {
                        new3.components[0].setStyle("PRIMARY").setEmoji("❌").setCustomId("x7").setDisabled(true)
                        a7 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey8") {
                        new3.components[1].setStyle("PRIMARY").setEmoji("❌").setCustomId("x8").setDisabled(true)
                        a8 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    } else if (interaction.customId === "grey9") {
                        new3.components[2].setStyle("PRIMARY").setEmoji("❌").setCustomId("x9").setDisabled(true)
                        a9 = "x"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.delete(message.author.id)
                    }

                    if (a1 === "x" && a2 === "x" && a3 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a4 === "x" && a5 === "x" && a6 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a7 === "x" && a8 === "x" && a9 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a1 === "x" && a4 === "x" && a7 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a2 === "x" && a5 === "x" && a8 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a3 === "x" && a6 === "x" && a9 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a1 === "x" && a5 === "x" && a9 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a3 === "x" && a5 === "x" && a7 === "x") {
                        message.channel.send({ content: `${message.author} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a1 !== '⬜' &&
                        a2 !== '⬜' &&
                        a3 !== '⬜' &&
                        a4 !== '⬜' &&
                        a5 !== '⬜' &&
                        a6 !== '⬜' &&
                        a7 !== '⬜' &&
                        a8 !== '⬜' &&
                        a9 !== '⬜') {
                        message.channel.send("Tie!")
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else return
                } else if (interaction.user.id === opponent.user.id) {
                    interaction.reply({ content: "Wait for your turn!", ephemeral: true }).catch((err) => { })
                } else {
                    interaction.reply({ content: "This is not your game!", ephemeral: true }).catch((err) => { })
                }
            } else if (!xPlaying.has(message.author.id)) {
                if (interaction.user.id === message.author.id) {
                    interaction.reply({ content: "Wait for your turn!", ephemeral: true }).catch((err) => { })
                } else if (interaction.user.id === opponent.user.id) {
                    if (interaction.customId === "grey1") {
                        new1.components[0].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o1").setDisabled(true)
                        a1 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey2") {
                        new1.components[1].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o2").setDisabled(true)
                        a2 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey3") {
                        new1.components[2].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o3").setDisabled(true)
                        a3 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey4") {
                        new2.components[0].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o4").setDisabled(true)
                        a4 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey5") {
                        new2.components[1].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o5").setDisabled(true)
                        a5 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey6") {
                        new2.components[2].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o6").setDisabled(true)
                        a6 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey7") {
                        new3.components[0].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o7").setDisabled(true)
                        a7 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey8") {
                        new3.components[1].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o8").setDisabled(true)
                        a8 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    } else if (interaction.customId === "grey9") {
                        new3.components[2].setStyle("PRIMARY").setEmoji("⭕").setCustomId("o9").setDisabled(true)
                        a9 = "o"
                        interaction.update({ embeds: [embed], components: [new1, new2, new3] }).catch((err) => { })
                        xPlaying.add(message.author.id)
                    }


                    if (a1 === "o" && a2 === "o" && a3 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a4 === "o" && a5 === "o" && a6 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a7 === "o" && a8 === "o" && a9 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a1 === "o" && a4 === "o" && a7 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a2 === "o" && a5 === "o" && a8 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a3 === "o" && a6 === "o" && a9 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a1 === "o" && a5 === "o" && a9 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a3 === "o" && a5 === "o" && a7 === "o") {
                        message.channel.send({ content: `${opponent.user} ganó!` }).catch((err) => { })
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else if (a1 !== '⬜' &&
                        a2 !== '⬜' &&
                        a3 !== '⬜' &&
                        a4 !== '⬜' &&
                        a5 !== '⬜' &&
                        a6 !== '⬜' &&
                        a7 !== '⬜' &&
                        a8 !== '⬜' &&
                        a9 !== '⬜') {
                        message.channel.send("Tie!")
                        xcollector.stop()
                        xPlaying.delete(opponent.user.id)
                        xPlaying.delete(message.author.id)
                    } else return
                } else {
                    interaction.reply({ content: "This is not your game!", ephemeral: true }).catch((err) => { })
                }
            }
        })
    }
}