 //---Bu Kod komutlar klasörüne atılacak atılacaktır.
//CodeMareFi tarafından hazırlanmıştır - - - Ekleyen //Sadista

const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
   if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')
   let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(rol => rol.name === args[0]);
  if (!rol) return message.channel.send('Herkese rol verebilmem için bir rol etiketlemelisin.')
  
   const embed = new Discord.RichEmbed()
     .setDescription(`Herkese ${rol} adlı rol verildi!`)
        .setColor(rol.hexColor)
   
   message.guild.members.forEach(u => {
})
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['toplu-rol-ver'],
    permLevel: 0
}

exports.help = {
    name: 'herkese-rol-ver',
    description: 'Herkeze Rol verir',
    usage: 'herkese-rol-ver @rol'
}