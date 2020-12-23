const Discord = require('discord.js');

module.exports = {
	name: "stop",
	category: "",
	aliases: ["st", "стоп", "dis", "disconnect", "отключись", "leave", "lev"],
	description: "Остановить воспроизведение треков.",
	availability: true,
	run: (message) => { 
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
  
	  const { channel } = message.member.voice;
	  
	  if (!channel) {
		let embed = new Discord.MessageEmbed()
			.setTitle("<:nope:751695799561486377> **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Вы должны быть в голосовом канале -_-`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL());
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
	  
	  player.destroy();
	  let embed = new Discord.MessageEmbed()
		.setTitle("<:music:736644780704006144> **Музыкальный плееер**")
		.setColor('RANDOM')
		.setDescription(`В очереди пусто, я покидаю канал`)
		.setTimestamp()
	  message.channel.send(embed);
	}
  }