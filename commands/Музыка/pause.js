const Discord = require('discord.js');

module.exports = {
	name: "pause",
	category: "",
	aliases: ["paus", "пауза"],
	description: "Поставить трек на паузу.",
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
	  if (player.paused){
			let embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Пауза уже установлена\n\nЧтобы продолжить воспроизведение, воспользуйтесь командой - \`/resume\``)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.channel.send(embed);
		}
  
	  player.pause(true);
	  let embed = new Discord.MessageEmbed()
		  .setTitle("⏸️ **Пауза**")
		  .setColor('RANDOM')
		  .setDescription(`Воспроизведение поставлено на паузу!`)
		  .setTimestamp()
		  .setFooter(message.guild.name, message.guild.iconURL())
	  return message.reply(embed);
	}
  }