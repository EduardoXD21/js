const {Discord, MessageEmbed} = require('discord.js');

module.exports = {
    name: "messageCreate",
    description: "Este no es un comando!, al etiquetar al bot mandara un mensaje",
    emiter: "on",
    run: async (client, message) => {
        let mencion = message.mentions.member.first()


        ///Variables matematicas para calcular tiempo UP
        let segundosTotales = (client.uptime / 1000);
        let dias = Math.floor(segundosTotales / 86400);
        segundosTotales %= 86400;
        let horas = Math.floor(segundosTotales / 3600);
        segundosTotales %= 3600;
        let minutos = Math.floor(segundosTotales / 60);
        let segundos = Math.floor(segundosTotales % 60);


const minfo = MessageEmbed()
.setTitle('¡Al parecer alguien me ha etiquetado!')
.setDescription(`¡Hola! Soy [Bot] y cumplo muchas funciones, algunas de estas son, darte la bienvenida, poner el orden con algunos sistemas de seguridad y hasta ayudarte con calculos con el comando !calculadora\n ¡Dato Extra 👀! Llevo despierto **${dias} Día(s) ${horas} Hora(s) ${minutos} Minutos ${segundos} Segundos **`)
.addField('Mis creadores son:', 'E D U A R D O ✓#7939 y drip$#0018')
.setImage('https://media.discordapp.net/attachments/927442566071320586/928072509893517332/robot.gif')

        if (mencion && mention.id === `${client.user.id}`){
            message.channel.send({embeds: [minfo]})
        }
    }
};