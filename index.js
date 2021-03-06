const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);




client.on('message', msg => {
  let tag = ayarlar.tag
  if (msg.content.toLowerCase() === 'tag') {
    msg.channel.send(` \`${tag}\` `);
  }
});

client.on('message', msg => {
    let tag = ayarlar.tag
  if (msg.content.toLowerCase() === '.tag') {
    msg.channel.send(` \`${tag}\` `);
  }
});

client.on('message', msg => {
    let tag = ayarlar.tag
  if (msg.content.toLowerCase() === '!tag') {
    msg.channel.send(` \`${tag}\` `);
  }
});
client.on('message', msg => {
    let tag = ayarlar.tag
  if (msg.content.toLowerCase() === '/tag') {
    msg.channel.send(` \`${tag}\` `);
  }
});


//////////

/////////////////////////////////////////////////////////AFK////////////////////////////////////////////////////
const ms = require("parse-ms");
const { DiscordAPIError } = require("discord.js");

client.on("message", async message => {

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);

    const afk = new Discord.MessageEmbed()

      .setColor("#ff0000")
      .setDescription(
        `**${USER.tag}** adlı kullanıcı \`${REASON}\` sebebiyle \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\` süredir AFK.`
      );

    message.channel.send(afk);
  }
});



  client.on("ready", () => {
  client.channels.cache.get("816257509949833217").join();
  });

client.on('ready', () => {
 client.user.setActivity(`ﻺ Developer by Clewas`);
})

 client.on("guildMemberAdd", member => {       
    let otorol = '816026503702642719' 
      member.roles.add(otorol) 
    });


const güzelsözler = [
  "Mucizelerden bahsediyordum Tam o sırda gözlerin geldi aklıma",
  "Huzur kokuyor geçtiğin her yer Güzel Kankam",
  "En güzel manzaramsın benim Seyretmeye Doyamadığım",
  "Seni Kelimeler ile Anlatmak Çok Zor Muhteşem Desem Yine Eksik Kalıyor Anlamın",
  "Gözlerinle baharı getirdin garip gönlüme :/",
  "Hayaline sarılmak bile yetiyor sana olan özlemimi gidermeye ♥",
  "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum",
  "Ben seni seçtim bu hayatta mutlu olabilmek için",
  "Riecta Sunucusunun En Güzel En Nazik İnsanı İyiki Varsın",
  "Gözlerinin kahvesinden koy ömrüme kırk yılın hatırına sen kalayım",
  "Güneş mi doğdu sen mi gülümsedin",
  "Senin gülüşün benim Güneşimdir Kankam ♥",
  "bi baktın ki gözüne güller açtı yüzümde",
  "Bir Gülüşü Var, Kelebek Görse Ömrü Uzar ♥",
  "Sen gökteki Meleklerin Yeryüzündeki tek temsilisin",
  "Bir gülsene cenneti merak Ediyorlarmış",
  "Pek çok yanlışın olduğu halde yanında olan kişi senin gerçek dostundur Hiç Bir Zaman Pes Etme.!",
  "Sensiz geçen bir ömür yaşanmamış bir hayattır",
  "Sen Yanımızda ol biz hep mutlu oluruz canım kankam" // bu şekilde arttırabilirsiniz
];

client.on("ready", async () => {
  let sunucuID = "715981705265152021"; // Sunucu ID
  let kanalID = "816026761775153162"; // Kanal ID
  let Erkek = "816026478848114709"; // Erkek 
  let Kadın = "816026478080819211"; // Kadın
  setInterval(() => {
    let sunucu = client.guilds.cache.get(sunucuID);
    client.channels
      .get(kanalID)
      .send(
        `${sunucu.members
          .filter(
            uye =>
              (uye.roles.cache.has(Erkek) || uye.roles.cache.has(Kadın)) &&
              uye.presence.status !== "offline"
          )
          .random()} ${
          güzelsözler[Math.floor(Math.random() * güzelsözler.length)]
        }`
      );
  }, 5 * 60 * 1000);
});
//--


client.on('userUpdate', async user => {
  let sunucuid = "816026761775153162"; //Buraya sunucunuzun IDsini yazın
  let tag = "ﻺ"; //Buraya tagınızı yazın
  let rol = "816026477291896852"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'tag-log'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.cache.get(sunucuid).members.cache.get(user.id);
  if (!member) return;
  if (!member.roles.cache.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.roles.add(rol)
      const tagalma = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.roles.remove(rol)
      const tagsilme = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});





client.on("message", async message => {
  const Bdgo = message.content.toLocaleLowerCase();

  if (
    Bdgo === "selam" ||
    Bdgo === "sa" ||
    Bdgo === "selamün aleyküm" ||
    Bdgo === "selamun aleyküm" ||
    Bdgo === "slm" ||
    Bdgo === "sea"
  ) {
    let e = await db.fetch(`sa-as_${message.guild.id}`);
    if (e === "acik") {
      const embed = new Discord.MessageEmbed()
      
     .setDescription(`Aleyküm Selam, Hoş Geldin ^-^`)
     .setColor("GREEN")
      
    return message.channel.send(embed)
    }
  }
});

client.on("channelDelete", async channel => {
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id === client.user.id) return;
  if (entry.executor.id === channel.guild.owner.id) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Bir Kanal Silindi!");
    embed.addField("Kanalı Silen", "`" + entry.executor.tag + "`");
    embed.addField("Kanalı Silen İD", "`" + entry.executor.id + "`");
    embed.addField("Silinen Kanal", "`"+channel.name + "`");
    embed.addField("Sonuç;", "Kanal Tekrar Açıldı");
    embed.setThumbnail(entry.executor.avatarURL());
    embed.setFooter(channel.guild.name, channel.guild.iconURL());
    embed.setColor("RED");
    embed.setTimestamp();
    client.channels.cache
      .get("816363868137717780")// <-- LOG KANAL ID
      .send(embed)
      .then(
        channel.clone().then(x => x.setPosition(channel.position))
    )
  }
});

//ROL KORUMA
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id === client.user.id) return;
  if (entry.executor.id === role.guild.owner.id) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Bir Rol Silindi!");
    embed.addField("Rolü Silen", "`" + entry.executor.tag + "`");
    embed.addField("Rolü Silen İD", "`" + entry.executor.id + "`");
    embed.addField("Silinen Rol", "`" + role.name + "`");
    embed.addField("Sonuç;", "Rol Tekrar Açıldı");
    embed.setThumbnail(entry.executor.avatarURL());
    embed.setFooter(role.guild.name, role.guild.iconURL());
    embed.setColor("RED");
    embed.setTimestamp();
    client.channels.cache
      .get("816363868137717780")// <-- LOG KANAL ID
      .send(embed)
      .then(
      role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Rol Açıldı.'})
    )
  }
});
  
