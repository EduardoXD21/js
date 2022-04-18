const {MessageEmbed} = require("discord.js")
const {SlashCommandBuilder} = require("@discord.js/builders")
const Discord = require("discord.js")
const ms = require("ms")

module.exports ={
    data: new SlashCommandBuilder()
    .setName("ttimeout")
    .setDescription("Aisla un miembro del servidor")
    .addUserOption(option => option.setName("miembro").setDescription("El miembro que sera aislado").setRequired(true))
    .addStringOption(option => option.setName("tiempo").setDescription("El tiempo por el que el miembro sera aislado").setRequired(true))
    .addStringOption(option => option.setName("razón").setDescription("La razón por la que el miembro sera aislado").setRequired(true)),

    async run(client, interaction){

        const user = interaction.options.getUser("miembro")
        const tiempo = interaction.options.getString("tiempo")
        const razon = interaction.options.getString("razón")

        let permisos = interaction.member.permissions.has("MODERATE_MEMBERS")
        if(!permisos) return interaction.reply({content: "No tienes permisos suficientes", ephemeral: true})

        const member = await interaction.guild.members.fetch(user.id)

        if(member.isComunicationDisabled()) return interaction.reply({content: "Ese miembro ya está aislado"})

        const time = ms(tiempo)

        await member.timeout(time, razon)
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.tag} ha sido aislado correctamente`)
        .setDescription(`**Tiempo:** ${tiempo}\n **Razón:**${razon}`)
        .setColor("RED")
        .setFooter(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()

        interaction.reply({embeds: [embed]})
    }
}