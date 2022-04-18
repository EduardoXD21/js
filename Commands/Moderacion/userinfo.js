const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require('moment');
moment.locale('pt-es') 
const now = moment();


module.exports = {
    name: "uinfo",
    aliases: ['ui'],
    description: "Sirve para ver información sobre un usuario del servidor del discord",
    run: async(client, message, args) => {
        
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [permisos]});

        let permisos = new MessageEmbed()
        .setDescription("**:x: No tienes permiso para usar esto!**")
        .setColor("RED")
        .setFooter( message.guild.name, message.guild.iconURL({ dynamic: true}))

        const look = new MessageActionRow()
        .addComponents(
            new MessageButton()
           .setURL('https://discord.id')
          .setLabel("ID Lookup")
          .setStyle("LINK")
        );

        const Anoni = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const Membro = message.guild.members.cache.get(Anoni.id);

        const Response = new MessageEmbed()
        .setAuthor(`${Anoni.username}#${Membro.user.discriminator}`, Anoni.displayAvatarURL({dynamic: true}))
        .setThumbnail(Anoni.displayAvatarURL({dynamic: true}))
        .setDescription("**__Información de usuario a continuación:__**")
        .setColor('RANDOM')
        .addField("ID del usuario", `\`\`\`${Anoni.id}\`\`\``, false)
        .addField("Miembro del servidor desde:", `\`\`\`${moment(Membro.joinedAt).format('DD/MM/YYYY HH:mm:ss')}\`\`\``)
        .addField("Usuario de Discord desde:", `\`\`\`${moment(Anoni.createdAt).format('DD/MM/YYYY HH:mm:ss')}\`\`\``)
        .addField("Roles", `${Membro.roles.cache.map(r => `${r}`).join(' ').replace("@everyone", " ")}`)
        .setFooter('Sistema de Administración Zenit Life ')
        message.reply({ embeds: [Response], components: [look]}); 
    }
}