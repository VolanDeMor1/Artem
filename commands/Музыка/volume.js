const Discord = require('discord.js');

module.exports = {
	name: "volume",
	category: "",
	aliases: ["vol", "v", "громкость", "г"],
	description: "Установить громкость треков.",
	availability: true,
	run: (message, args) => {
	  const player = message.client.manager.players.get(message.guild.id);
  
	  if (!player){
		let embed = new Discord.MessageEmbed()
			.setTitle("<:nope:751695799561486377> **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`В очереди пусто 😔`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL());
		return message.channel.send(embed);
	}
	  if (!args.length){
		let embed = new Discord.MessageEmbed()
			.setTitle("🔉 **Громкость**")
			.setColor('RANDOM')
			.setDescription(`Громкость: **${player.volume}**`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
		return message.channel.send(embed);
	}
  
	  const { channel } = message.member.voice;
	  
	  if (!channel) {
		let embed = new Discord.MessageEmbed()
			.setTitle("<:nope:751695799561486377> **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Вы должны быть в голосовом канале -_-`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
		return message.channel.send(embed);
	};
	  if (channel.id !== player.voiceChannel){
		let embed = new Discord.MessageEmbed()
			.setTitle("<:nope:751695799561486377> **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Вы должны находится в том же канале, что и я`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
		return message.channel.send(embed);
	}
  
	  const volume = Number(args[0]);
	  
	  if (!volume || volume < 1 || volume > 100){
		let embed = new Discord.MessageEmbed()
			.setTitle("<:nope:751695799561486377> **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Вы должны указать громкость между 1 и 100`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL());
		return message.channel.send(embed);
	}
  
	  player.setVolume(volume);
	  let embed = new Discord.MessageEmbed()
		  .setTitle("🔉 **Изменение громкости**")
		  .setColor('RANDOM')
		  .setDescription(`Громкость установлена: **${volume}**`)
		  .setTimestamp()
		  .setFooter(message.guild.name, message.guild.iconURL())
	  return message.reply(embed);
	}
  }