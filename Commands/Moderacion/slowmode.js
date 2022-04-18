const Discord = require('discord.js');
const { MessageEmbed}   = require('discord.js');
const ms = require('ms')

module.exports = {
    name: "slowmode",
    alias: ["slw"],
    description: "Sirve para establecer un cooldown en un canal, es decir, que por cada x tiempo que establezcas los usuarios podran escribir",

    run: async(client,message,args) =>{
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send('No tienes permisos suficientes').then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000) 
        })
        let channel = message.channel
        
        let time = args[0]
        if(!time) return message.channel.send('Debes escribir el tiempo').then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000) 
        })

        if(time === 'off'){
            channel.setRateLimitPerUser(0)

const off = new MessageEmbed()
.setDescription('El **slowmode** para este canal ha sido **desactivado**')
.setColor('GOLD')

            return message.channel.send({embeds: [off]})
        }

        let convert = ms(time)
        let toSecond = Math.floor(convert / 1000)

        if(!toSecond || toSecond == undefined) return message.channel.send("Debes poner un tiempo válido").then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000) 
        })

const on = new MessageEmbed()
       .setTitle('⚠ Slowmode activado')
       .setDescription(`${message.author} has activado el slowmode en este canal, ahora se podra escribir cada ${time}`)
       .setColor('GOLD')
.setFooter('Sistema de seguridad')

        await channel.setRateLimitPerUser(toSecond)
        message.channel.send({embeds: [on]})
    }
}