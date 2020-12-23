const Discord = require('discord.js');

module.exports = {
	name: 'play',
	category: "",
	aliases: ["p", "играй", "играть", "музыка", "поиск"],
	description: "Проигровать музыку.",
	availability: true,
	run: async (message, args, bot) => {
	  const { channel } = message.member.voice;
  
	  if (!channel) {
		let embed = new Discord.MessageEmbed()
			.setTitle("<:nope:751695799561486377> **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Вы должны быть в голосовом канале`)
			.setFooter(message.guild.name, message.guild.iconURL());
		return message.channel.send(embed);
	};
	  if (!args.length) {
		let embed = new Discord.MessageEmbed()
		.setTitle("<:nope:751695799561486377> **Внимание!**")
		.setColor('#ff4f4f')
		.setDescription(`Вы должны указать что хотите найти`)
		.setFooter(message.guild.name, message.guild.iconURL());
		return message.channel.send(embed);
	  }
  
	  const player = message.client.manager.create({
		guild: message.guild.id,
		voiceChannel: channel.id,
		textChannel: message.channel.id,
	  });
  
	  player.connect();
  
	  const search = args.join(' ');
	  let res;
  
	  try {
		res = await player.search(search, message.author);
		if (res.loadType === 'LOAD_FAILED') {
		  if (!player.queue.current) player.destroy();
		  throw new Error(res.exception.message);
		}
	  } catch (err) {
		let embed = new Discord.MessageEmbed()
			.setTitle("<:nope:751695799561486377> **Внимание!**")
			.setColor('#ff4f4f')
			.setDescription(`Произошла неизвестная ошибка.\nОтчёт отправлен разработчику.`)
			.setFooter(message.guild.name, message.guild.iconURL());
		bot.users.cache.get('575981243011956749').send(`\`\`\`js\n${err.message}\`\`\``)
		return message.reply(embed);
	  }
  
	  switch (res.loadType) {
		case 'NO_MATCHES':
		  if (!player.queue.current) player.destroy();
		  let embed = new Discord.MessageEmbed()
			  .setTitle("<:nope:751695799561486377> **Внимание!**")
			  .setColor('#ff4f4f')
			  .setDescription(`Песня не найдена`)
			  .setFooter(message.guild.name, message.guild.iconURL());
		  return message.reply(embed);
		case 'TRACK_LOADED':
		  player.queue.add(res.tracks[0]);
  
		  if (!player.playing && !player.paused && !player.queue.length) player.play();
		  let embedd = new Discord.MessageEmbed()
			  .setColor('RANDOM')
			  .setDescription(`Загружаю: **${res.tracks[0].title}**`)
		  return message.reply(embedd);
		case 'PLAYLIST_LOADED':
		  player.queue.add(res.tracks);
  
		  if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
		  let embeddd = new Discord.MessageEmbed()
			  .setTitle("<:music:736644780704006144> **Музыкальный плееер**")
			  .setColor('RANDOM')
			  .setDescription(`Начинаю играть плейлист: **${res.playlist.name.replace("**", "")}** с **${res.tracks.length} треками**`)
			  .setTimestamp()
		  return message.reply(embeddd);
		case 'SEARCH_RESULT':
		  let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
		  if (res.tracks.length < max) max = res.tracks.length;
  
		  const results = res.tracks
			  .slice(0, max)
			  .map((track, index) => `${++index}. **${track.title.replace("**", "")}**`)
			  .join('\n');
			let embeddddd = new Discord.MessageEmbed()
			.setTitle("🔎 **Поиск музыки**")
			.setColor('RANDOM')
			.setDescription(results)
			.setTimestamp()
			.setFooter(`Напишите сообщение с номером нужной композиции`);
  
		  message.channel.send(embeddddd);
  
		  try {
			collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
		  } catch (e) {
			if (!player.queue.current) player.destroy();
			let embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы не выбрали трек который хотели бы послушать`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.reply(embed);
		  }
  
		  const first = collected.first().content;
  
		  if (first.toLowerCase() === 'отмена') {
			if (!player.queue.current) player.destroy();
			let embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Вы отменили выбор`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.channel.send(embed);
		  }
  
		  const index = Number(first) - 1;
		  if (index < 0 || index > max - 1){
			let embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`Число, которое вы указали, слишком маленькое или слишком большое (1-${max}).`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL())
			return message.reply(embed)
		  };
  
		  const track = res.tracks[index];
		  player.queue.add(track);
  
		  if (!player.playing && !player.paused && !player.queue.length) player.play();
		//   let embeded = new Discord.MessageEmbed()
		// 	  .setTitle("<:music:736644780704006144> **Музыкальный плееер**")
		// 	  .setColor('RANDOM')
		// 	  .setDescription(`Начинаю играть: **${track.title}**`)
		// 	  .setTimestamp()
		//   return message.reply(embeded);
	  }
	},
  };