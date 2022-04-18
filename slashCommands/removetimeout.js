const {SlashCommandBuilder} = require("@discord.js/builders")
const Discord = require("discord.js")
const ms = require("ms")

module.exports ={
    data: new SlashCommandBuilder()
    .setName("rtimeout")
    .setDescription("Remueve el aislamiento de un miembro del servidor")
    .addUserOption(option => option.setName("miembro").setDescription("El miembro que dejara de estar aislado").setRequired(true)),

    async run(client, interaction){

        const user = interaction.options.getUser("miembro")

        let permisos = interaction.member.permissions.has("MODERATE_MEMBERS")
        if(!permisos) return interaction.reply({content: "No tienes permisos suficientes", ephemeral: true})

        const member = await interaction.guild.members.fetch(user.id)

        if(member.isComunicationDisabled()) return interaction.reply({content: "Ese miembro no está aislado"})

        await member.timeout(null)
        
        interaction.reply({content: `${member} Ya no esta aislado`})
    }
}