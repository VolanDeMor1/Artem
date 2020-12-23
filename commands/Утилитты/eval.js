const Discord = module.require('discord.js');
module.exports = {
	name: 'eval',
	category: "",
	aliases: ["e", "е", "евал"],
	description: "Для разработчика.",
	availability: false,
	run: async (message, args, bot) => {
        const permissions = message.channel.permissionsFor(message.client.user);
		if (message.author.id !== '575981243011956749') {
			const embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription('У вас нет прав')
				.setImage('https://media1.tenor.com/images/36deb2e981bfafc250bd680609ecb107/tenor.gif?itemid=10611246');

			message.channel.send(embed);
			return '';
		}
		try {
			if (args.join(' ').toLowerCase().includes('token') || args.join(' ').toLowerCase().includes('botconfig')) {
				const embed = new Discord.MessageEmbed()
					.setTitle("🚫 **Внимание!**")
					.setColor('#ff4f4f')
					.setTimestamp()
					.setDescription('Не пытайся меня сломать, у меня продуман каждый шаг)')
					.setFooter(message.guild.name, message.guild.iconURL());

				message.channel.send(embed);
				return '';
			}

				var page = 1;
				let argss = args.join(' ')
				let evaled = await eval(argss);
      			if(typeof evaled!== 'string') evaled = require('util').inspect(evaled, {depth: 0});
				const ping = new Date().getTime() - message.createdTimestamp;
				let aye = 0;
				for(let a = 0; a < evaled.length; a++){
				  aye += evaled[a].length;
				}
				var pagemax = Number(Math.round(aye / 1500));
				let slicemax = 2000;
				let slicemin = 0;
				send();
				function send(){
					const embed = new Discord.MessageEmbed()
						.setColor('#03fc03')
						.setDescription(`**Ответ (${page}/${pagemax}):**\n\`\`\`js\n${evaled.slice(slicemin, slicemax)}\n\`\`\``)
						.addField('Тип:', typeof evaled, true)
						.addField('Выполнено за:', `${ping}ms`, true)
						.setTimestamp()
						.setFooter(`${message.author.username} | ${message.guild.name}`, message.author.avatarURL());
					message.channel.send(embed).then(msg => {
						if(aye >= 1500){
							msg.react('763360733169713152');
						}
						msg.react('🗑️');
						if(aye >= 1500){
							msg.react('763360710423347260');
						}
						collector(msg);
					});
				}
				function edit(msg){
					const embed = new Discord.MessageEmbed()
						.setColor('#03fc03')
						.setDescription(`**Ответ (${page}/${pagemax}):**\n\`\`\`js\n${evaled.slice(slicemin, slicemax)}\n\`\`\``)
						.addField('Тип:', typeof evaled, true)
						.addField('Выполнено за:', `${ping}ms`, true)
						.setTimestamp()
						.setFooter(`${message.author.username} | ${message.guild.name}`, message.author.avatarURL());
					msg.edit(embed);
				}
				function collector(msg) {
					let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:60000});
					c.on("collect", (r, u) => {
						console.log(aye);
						if(r.emoji.name == '🗑️' && u.id == message.author.id){
							msg.delete();
							return "";
						}else if(r.emoji.name == 'aleft' && u.id == message.author.id &&  aye >= 1500 && slicemin > 0){ // Левая
							page--;
							slicemax -= 1000;
							slicemin -= 1000;
							edit(msg);
							collector(msg);
							return "";
						}else if(r.emoji.name == 'aright' && u.id == message.author.id &&  aye >= 1500){ // Правая
							page++;
							slicemax += 1000;
							slicemin += 1000;
							edit(msg);
							collector(msg);
							return "";
						}else{
							if(permissions.has('MANAGE_MESSAGES')){
								clearreact(msg, u.id);
							}
							collector(msg);
							return "";
						}
					});
				};
		
				async function clearreact(msg, uid){
					const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
					for (const reaction of userReactions.values()) {
						await reaction.users.remove(uid).then(()=>{
							msg.react('🗑️')
						});}
				}
		} catch (e) {
			const embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription(`\`\`\`${e}\`\`\``)
				.setFooter(`${message.author.username} | ${message.guild.name}`, message.guild.iconURL());

			message.channel.send(embed);
		}
	}
};
