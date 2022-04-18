const client = require('../index');
const {
    MessageEmbed
} = require('discord.js');

/// Aviso de boosteos
client.on("guildMemberBoost", (member) => {

    const LogChannel = client.channels.cache.get('935782364695650384'); 
    const MemberBoost = new MessageEmbed()
        .setTitle('¡Un usuario ha boosteado el servidor!')
        .setColor('PURPLE')
        .setDescription(`**${member.user.tag}** boosteo ${member.guild.name}, muchas gracias!`);
    return LogChannel.send({
        embeds: [MemberBoost]
    });

})

// Deja de boostear
client.on("guildMemberUnboost", (member) => {

    const LogChannel = client.channels.cache.get('932027691979374603'); 
    const MemberUnboost = new MessageEmbed()
        .setTitle('Un usuario dejo de boostear el servidor')
        .setColor('PURPLE')
        .setDescription(`**${member.user.tag}** dejo de boostear ${member.guild.name}!`);

    return LogChannel.send({
        embeds: [MemberUnboost]
    });

})

///Log de edicion de mensaje
client.on("messageContentEdited", (message, oldContent, newContent) => {

    const LogChannel = client.channels.cache.get('932027691979374603'); 
    const MessageEdited = new MessageEmbed()
        .setTitle('Nuevo Mensaje Editado')
        .setColor('#2F3136')
        .setDescription(`Mensaje original: \`${oldContent}\` \n Mensaje editado: \`${newContent}\``);

    return LogChannel.send({
        embeds: [MessageEdited]
    });

})