const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "ban",
  description: "Sirve para banear😐",
  run: async(client, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **No tienes permisos para usar este comando.**`); 

        const usu = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Sin Motivo";

        let channelID = db.get(`${message.guild.id}_channelID`)
        if (!channelID) return
        let channel = message.guild.channels.cache.get(channelID)
        if (!channel) return
        
        let clearbutton = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("sim")
            .setLabel("Si")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("nao")
            .setLabel("No")
            .setStyle("DANGER"),
        )

        let incomplet = new MessageEmbed()
        .setTitle(`🔨 | Comando para banear`)
        .setColor("RED")
        .setDescription(`**\n📋 | Descripción: Utiliza este comando para banear a alguien.\n\n❓ | Como usarlo? Usalo de la siguiente forma: !ban (usuario/id) (motivo) \n\n📜 | Ejemplo: !ban @drip$/916436068788748289 + razón **`)
        if (!args[0]) return message.channel.send({embeds: [incomplet]})

        if(!usu) return message.channel.send({embeds: [incomplet]})

        let confirm = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`**📝 | Estas seguro que deseas banear a ${usu}  \n\n Por la razón: ${reason}?**`)
        .setFooter(`${message.guild.iconURL({dynamic : true})}${message.guild.name}`)
        .setTimestamp()

        let enviado = await message.channel.send({ embeds: [confirm], components: [clearbutton]})

        const collector = enviado.createMessageComponentCollector({ componentType: "BUTTON"})

        collector.on("collect", async(interaction) => {
            if(!interaction.memberPermissions.has("ADMINISTRATOR")) return interaction.reply({ content: `${interaction.user}, solo los administradores pueden determinar el ban`, ephemeral: true})
            if( interaction.customId === "sim") {

                let sucess = new MessageEmbed()
                .setTitle(`✅ | Baneo exitoso!`)
                .setDescription(`**📌 | Baneaste a ${usu} por ${reason}!**`)
                .setColor("GREEN")
                .setFooter(`🕐 | Enviado `)
                .setTimestamp()
                message.channel.send({embeds: [sucess]})

                enviado.edit({embeds: [sucess]})

                const embed = new MessageEmbed()
                .setTitle(`🔨 | Has sido baneado!`)
                .setThumbnail(message.guild.iconURL({dynamic : true}))
                .setDescription(`🔨 | Servidor: ${message.guild.name}\n🔨 | Baneado por: ${message.author}\n🔨 | Motivo: ${reason}`)
                .setColor("RED")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic : true}));  

                const banmsg = new MessageEmbed()
                .setTitle(`🔨 | Baneo!`)
                .setThumbnail(usu.user.displayAvatarURL())
                .setDescription(`🔨 | Baneado: ${usu.user}\n🔨 | Por: ${message.author}\n🔨 | Motivo: ${reason}`)
                .setColor("GREY")
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL());

                await usu.send({embeds: [embed]});
                await usu.ban({
                    reason: reason
                });
                
                channel.send({embeds: [banmsg]});
            }
            if( interaction.customId === "nao") {
                enviado.edit({
                    content: "**Cancelaste el ban.**",
                    embeds: [],
                    components: []
                })
            }
        })
        



    } 
}