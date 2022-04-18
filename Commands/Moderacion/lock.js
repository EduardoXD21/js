const discord = require('discord.js')
const { 
    Message, 
    Client, 
    MessageActionRow, 
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const ms = require("ms")

module.exports = {
    name: "lock",
    description: "Sirve para bloquear un canal, es decir, los usuarios no podran escribir en este canal por el tiempo que defina el staff",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();
        let tempo = args.slice(0).join(" ") || "15m"

        let button = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("destrancar")
            .setLabel("Desbloquear")
            .setStyle("DANGER")
        )


        let permissao = new MessageEmbed()
        .setDescription("**:x: No tienes permiso para usar esto!**")
        .setColor("RED")
        .setFooter( message.guild.name, message.guild.iconURL({ dynamic: true}))

        let permissaobot = new MessageEmbed()
        .setDescription("**:x: Disculpa, No tengo permiso para usar esto!**")
        .setColor("RED")
        .setFooter( message.guild.name, message.guild.iconURL({ dynamic: true}))

        let trancado = new MessageEmbed()
        .setAuthor(`🔒 El canal fue bloqueado!`)
        .addField(`Staff`, `${message.author}`)
        .addField(`Tiempo:`, `${tempo}`)
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setColor("RED")
        .setFooter('🤖| Sistema de seguridad Zenit Life ')

        let destrancado = new MessageEmbed()
        .setDescription(`🔓 **${message.channel} fue desbloqueado!**`)
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setColor("RED")
        .setFooter('🤖| Sistema de seguridad Zenit Life ')

        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [permissao]});
        if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [permissaobot]});

        message.channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false
        });

        const enviado = await message.channel.send({ embeds: [trancado], components: [button]})

        const collector = enviado.createMessageComponentCollector({ componentType: "BUTTON"})

        collector.on("collect", async(interaction) => {
            if(!interaction.memberPermissions.has("ADMINISTRATOR")) return interaction.reply({ content: `${interaction.user}, solo los staff pueden desbloquear`, ephemeral: true})
            if(interaction.customId === "destrancar") {
                message.channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: true
                });
            }
            enviado.edit({
                embeds: [destrancado],
                components: []
            })
        })
        setTimeout( async () => {
            message.channel.permissionOverwrites.edit(message.guild.id, {
                SEND_MESSAGES: true
            });
            enviado.edit({
                embeds: [destrancado],
                components: []
            })
        }, ms(tempo))
    }, 
};