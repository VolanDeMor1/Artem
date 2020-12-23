const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { readdirSync } = require("fs");
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const Air = require('./struct/client.js');
let Discord = require("discord.js");

const bot = new Air(require('./botconfig.json'));
// bot.commands = new Collection();
// bot.aliases = new Collection();
// bot.profiles = require('./users.json');
// bot.cities = require('./cities.json');
// bot.purses = require('./purses.json');
// bot.permissions = [ "PRIVATE", "SOMEBODY", "ONLYADD", "ONLYREMOVE" ];

Discord.User.prototype.profile = function profile(){ 
  return bot.profiles[this.id]; 
};
Discord.GuildMember.prototype.profile = function profile(){ 
  return bot.profiles[this.user.id]; 
};
Discord.Client.prototype.getProfileByID = function profileByID(id){ 
  return this.profiles[id]; 
};
Discord.Client.prototype.getCityByName = function getCityByName(name){ 
  return this.cities[name];
};
Discord.Client.prototype.getGuildByID = function getGuildByID(id){ 
  return this.guilds.cache.get(id); 
};
Discord.Guild.prototype.getMemberByID = function getMemberByID(id){ 
  return this.members.cache.get(id); 
};
Discord.Message.prototype.createProfile = function createProfile(){
  return bot.profiles[this.author.id] = {
    moderation: {
      mute: {
        status: false,
        time: 0,
        channel: 0
      },
      warns: {
        kicked: false,
        cout: 0,
        channel: 0
      }
    },
    bank: {
      balance: 0,
      invoice_num: 1,
      invoices: {}
    },
    playlist: []
  };
};
Discord.Client.prototype.createProfile = function createProfile(id){
  return bot.profiles[id] = {
    moderation: {
      mute: {
        status: false,
        time: 0,
        channel: 0
      },
      warns: {
        kicked: false,
        cout: 0,
        channel: 0
      }
    },
    bank: {
      balance: 0,
      invoice_num: 1,
      invoices: {}
    },
    playlist: []
  };
};

const clientID = "2f9d6b518c3348afbfc36b5003996721"; // clientID from your Spotify app
const clientSecret = "f94b7108cebf44428c78c32c8ab7e830"; // clientSecret from your Spotify app

bot.manager = new Manager({
  plugins: [ new Spotify({ clientID, clientSecret }) ],
  nodes: [{
    host: "localhost",
    retryDelay: 2222,
  }],
  autoPlay: true,
  send: (id, payload) => {
    const guild = bot.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
})
  .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" connected.`))
  .on("nodeError", (node, error) => console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`))
  .on("trackStart", (player, track) => {
    const channel = bot.channels.cache.get(player.textChannel);
    let embed = new MessageEmbed()
      .setTitle("<:music:736644780704006144> **Музыкальный плееер**")
      .setColor('RANDOM')
      .setDescription(`Начинаю играть: **${track.title}**`)
      .setTimestamp()
      .setFooter(`${channel.guild.name} | Запросил ${track.requester.tag}`, channel.guild.iconURL());
    channel.send(embed);
  })
  .on("queueEnd", player => {
    const channel = bot.channels.cache.get(player.textChannel);
    let embed = new MessageEmbed()
      .setTitle("<:music:736644780704006144> **Музыкальный плееер**")
      .setColor('RANDOM')
      .setDescription(`В очереди пусто, я покидаю канал`)
      .setTimestamp()
    channel.send(embed);
    player.destroy();
  });

  bot.once("ready", () => {
    bot.manager.init(bot.user.id);
    console.log(`Logged in as ${bot.user.tag}`);
  });

  bot.on("ready", () => {
    bot.setInterval(() => {
      for (const i in bot.profiles) {
        if(bot.profiles[i].moderation.mute.status == true){
          const { time } = bot.profiles[i].moderation.mute;
          const muteRole = bot.guilds.cache.get('768484130308227132').roles.cache.get('768890525277093938');
          if (Date.now() >= time) {
            bot.guilds.cache.get('768484130308227132').members.fetch(i).then(member => {
              member.roles.remove(muteRole);
              let embed = new MessageEmbed()
                .setTitle("<:yeah:751695766787063918> **Авто-Размут**")
                .setColor('#fcd303')
                .addField("**Нарушитель:**",`<@${member.user.id}>`)
                .setThumbnail(member.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter(member.guild.name, member.guild.iconURL());
              bot.channels.fetch(bot.profiles[i].moderation.mute.channel).then(chh => {
                chh.send(embed)
                bot.profiles[i].moderation.mute.status = false;
                bot.profiles[i].moderation.mute.time = 0;
                bot.profiles[i].moderation.mute.channel = 0;
              });
            });
          }
        }
        if(bot.profiles[i].moderation.warns.cout >= 5){
          bot.guilds.cache.get('768484130308227132').members.fetch(i).then(member => {
            if(bot.profiles[member.user.id].moderation.warns.kicked){
              let embed = new MessageEmbed()
                .setTitle("<:yeah:751695766787063918> **Авто-БАН**")
                .setColor('#fcd303')
                .addField("**Нарушитель:**",`<@${member.user.id}>`)
                .addField("**Количество варнов:**",`5/5 + Был 1 раз кикнут`)
                .setThumbnail(member.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter(member.guild.name, member.guild.iconURL());
              member.send(embed);
              bot.channels.fetch(bot.profiles[i].moderation.warns.channel).then(chh => {
                chh.send(embed);
                bot.profiles[member.user.id].moderation.warns.kicked = false;
                bot.profiles[member.user.id].moderation.warns.cout = 0;
                member.ban();
              });
            }
            if(!bot.profiles[member.user.id].moderation.warns.kicked){
              let embed = new MessageEmbed()
                .setTitle("<:yeah:751695766787063918> **Авто-Кик**")
                .setColor('#fcd303')
                .addField("**Нарушитель:**",`<@${member.user.id}>`)
                .addField("**Количество варнов:**",`5/5`)
                .setThumbnail(member.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter(member.guild.name, member.guild.iconURL());
              member.send(embed);
              bot.channels.fetch(bot.profiles[i].moderation.warns.channel).then(chh => {
                chh.send(embed);
                bot.profiles[member.user.id].moderation.warns.kicked = true;
                bot.profiles[member.user.id].moderation.warns.cout = 0;
                member.kick("5 Предупреждений - Кик");
              });
            }
          });
        }
      }
      fs.writeFile('./users.json', JSON.stringify(bot.profiles), err => {
        if (err) console.log(err);
      });
      fs.writeFile('./cities.json', JSON.stringify(bot.cities), err => {
        if (err) console.log(err);
      });
      fs.writeFile('./purses.json', JSON.stringify(bot.purses), err => {
        if (err) console.log(err);
      });
    }, 5000);

    bot.setInterval(() => {
      for(let user in bot.profiles){
        for(let inv in bot.profiles[user].bank.invoices){
          const { date } = bot.profiles[user].bank.invoices[inv];
          bot.users.fetch(user).then(member => {
            if(Date.now >= date){
              let embed = new MessageEmbed()
                  .setTitle("**День добрый!**")
                  .setColor('RANDOM')
                  .setTimestamp()
                  .setDescription(`У вас обнаружен инвойс (**#${inv}**), который вы не оплатили в течении 10 дней. Поэтому мы вынуждены принудительно снять сумму инвойса с вышего счёта, у вас есть 5 минут на то чтобы успеть пополнить счёт, если это необходимо.\n\n> **Данные инвойса:**\n> **Сумма:** ${bot.profiles[user].bank.invoices[inv].value} <:ap:772823205420204062>\n> **Коментарий:** ${bot.profiles[user].bank.invoices[inv].reason}`)
              member.send(embed);
              setTimeout(() => {
                bot.profiles[user].bank.balance -= bot.profiles[user].bank.invoices[inv].value;
                delete bot.profiles[user].bank.invoices[inv];
              }, 5*60*1000)
            }
          });
        }
      }
    }, 1000)
  });

bot.on("raw", d => bot.manager.updateVoiceState(d));

bot.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  if(!bot.profiles[message.author.id]){
    message.createProfile();
  }
	const mentionRegexPrefix = RegExp(`^<@!${bot.user.id}> `);
	const prefix = message.content.match(mentionRegexPrefix) ?
		message.content.match(mentionRegexPrefix)[0] : require('./botconfig.json').prefix;
  
	const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = bot.commands.get(cmd.toLowerCase()) || bot.commands.get(bot.aliases.get(cmd.toLowerCase()));

	if (command && message.content.startsWith(prefix)){
		if(!command.availability && message.author.id !== '575981243011956749') return;
		command.run(message, args, bot);
	}
});

bot.on('ready', () => {
	setInterval(() => {
		bot.channels.cache.get('768484130308227134').children.forEach(c => {
			if(c.id !== '768484130308227136' && c.id !== '768484858103595048' && c.id !== '768889564751200266'){
				if(c.members.size == 0){
				  c.delete();
				}
			}
		});
	}, 2000);
});

bot.on("message", async msg => {
  if(msg.author.id == '401721581916651520' || msg.author.id == '575981243011956749'){
    const mentionRegexPrefix = RegExp(`^<@!${bot.user.id}> `);
    const prefix = msg.content.match(mentionRegexPrefix) ? msg.content.match(mentionRegexPrefix)[0] : require('./botconfig.json').prefix;
    const [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/ +/g);
    if(cmd.toLowerCase() == "скажи"){
      let user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(args.slice(1, 10000).join(" "))
      try{
        user.send(embed);
      }catch(e){
        const embed = new Discord.MessageEmbed()
          .setTitle("🚫 **Внимание!**")
          .setColor('#ff4f4f')
          .setTimestamp()
          .setDescription(`\`\`\`${e}\`\`\``)
        msg.channel.send(embed);
      }
      msg.delete();
    }
  }
});

bot.on("message", async msg => {
  if(msg.channel.id == '775602230069428224'){
    bot.users.cache.get('401721581916651520').send(`Добавь челика (<@${msg.author.id}>) в вайтлист\n\`\`\`whitelist add ${msg.content}\`\`\``);
    bot.users.cache.get('575981243011956749').send(`Добавь челика (<@${msg.author.id}>) в вайтлист\n\`\`\`whitelist add ${msg.content}\`\`\``);
    try{
      msg.member.setNickname(msg.content);
      msg.member.roles.add(msg.guild.roles.cache.get('768530408744681524'));
      let embed = new MessageEmbed()
      .setTitle(`**Добро пожаловать, ${msg.content}!**`)
      .setDescription(`Вас добавили в список ожидания добавления в белый список нашего сервера, это может занять пару часов.\nКак только вас добавят, с вами свяжутся. Удачи!`);
      msg.author.send(embed);
    }catch{
      msg.member.setNickname(msg.content);
      msg.member.roles.add(msg.guild.roles.cache.get('768530408744681524'));
    }
    msg.delete();
  }
});

bot.start();