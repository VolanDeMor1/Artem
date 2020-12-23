const Discord = module.require('discord.js');
const fs = require('fs');
module.exports = {
	name: 'say',
	category: "",
	description: 'Сказать от имени бота.',
    aliases: ["сказать"],
	availability: true,
	run: (message, args, bot) => {
		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription('Вы не указали текст')
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
			return '';
		}
		message.delete().catch();
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
				.setDescription(args.join(" "))

			message.channel.send(embed);
			return '';
		}
			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription(args.join(" "))
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
	}
};
