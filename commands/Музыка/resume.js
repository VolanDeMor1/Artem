const Discord = require('discord.js');

module.exports = {
	name: "resume",
	category: "",
	aliases: ["продолжай", "продолжить", "res"],
	description: "Продолжить воспроизведение.",
	availability: true,
	run: (message) => {
	  const player = message.client.manager.players.get(message.guild.id);
	  if (!player){
		let embed = new Discord.MessageEmbed()
			.setTitle("🚫 **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`В очереди пусто 😔`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL());
		return message.channel.send(embed);
	}
  
	  const { channel } = message.member.voice;
	  
	  if (!channel) {
		let embed = new Discord.MessageEmbed()
			.setTitle("🚫 **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Вы должны быть в голосовом канале -_-`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL());
		return message.channel.send(embed);
	};
	  if (channel.id !== player.voiceChannel){
		let embed = new Discord.MessageEmbed()
			.setTitle("🚫 **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Вы должны находится в том же канале, что и я`)
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
		return message.channel.send(embed);
	}
	let embed = new Discord.MessageEmbed()
		.setTitle("🚫 **Внимание!**")
		.setColor('#ff4f4f')
		.setDescription(`Треки итак уже играют\n\nЧтобы поставить на паузу воспроизведение, воспользуйтесь командой - \`/resume\``)
		.setTimestamp()
		.setFooter(message.guild.name, message.guild.iconURL())
	  if (!player.paused) return message.reply(embed);
  
	  player.pause(false);
	  let embedd = new Discord.MessageEmbed()
		  .setTitle("▶️ **Продолжить**")
		  .setColor('RANDOM')
		  .setDescription(`Песни снова играют!`)
		  .setTimestamp()
		  .setFooter(message.guild.name, message.guild.iconURL())
	  return message.reply(embedd);
	}
  }
  