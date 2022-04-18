const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ic",
    aliases: [],
    description: "Info de comandos",
    run: async(client, message, args) => {

        let ic = new MessageEmbed()
            .setAuthor('Sin nombre RP | Comandos ic vips')
            .setDescription("Para dar skin de armas: [setgroup id viparmas]\n\nPara entregar un vehiculo del catalogo vip o del gta V mods: [darauto id modelo{nombre para spawnear el vehiculo}]\n\nPara dar las luces led: [giveitem id lucesauto]\n\nLa ruleta es de forma OOC lo cual tengo que mandar el link y todo eso\n\nPara crear una casa es: [createhouse] se te abre un menu lo cual tienes que seguir los pasos que te salen en el menu")
            .setColor("DARK_GOLD")

        message.reply({ embeds: [ic] })
    }
}