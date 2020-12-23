const Discord = require('discord.js');

module.exports = {
	name: "loop",
	category: "",
	aliases: ["repeat", "rep", "r", "покругу", "l"],
	description: "Сделать трек бесконечным.",
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
	  
	  if (args.length && /очередь/i.test(args[0])) {
		player.setQueueRepeat(!player.queueRepeat);
		const queueRepeat = player.queueRepeat ? "Включено" : "Выключено";
		let embed = new Discord.MessageEmbed()
			.setTitle("🔂 **Покругу**")
			.setColor('#00ff48')
			.setDescription(`${queueRepeat}, теперь очередь повтрояется.`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL());
		return message.reply(embed);
	  }
  
	  player.setTrackRepeat(!player.trackRepeat);
	  const trackRepeat = player.trackRepeat ? "Включено" : "Выключено";
	  let embed = new Discord.MessageEmbed()
		  .setTitle("🔂 **Покругу**")
		  .setColor('#00ff48')
		  .setDescription(`${trackRepeat}, теперь трек повтрояется.`)
		  .setTimestamp()
		  .setFooter(message.guild.name, message.guild.iconURL());
	  return message.reply(embed);
	}
  }