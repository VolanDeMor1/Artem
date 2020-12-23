const Discord = require('discord.js');
module.exports = {
	name: "cities",
	aliases: ["cy", "города", "г"],
	description: "Все города внесённые в БД.",
	category: "",
	availability: false,
	run: async (message, args, bot) => {
		let cl = '';
		let a = 1;
		for (let u in bot.cities){
					cl += `${a++}. **${u}**\n`
		}
			let embed = new Discord.MessageEmbed()
				.setTitle(`🗺️ Список городов`)
				.setColor('#4287f5')
				.setDescription(`${cl}\n\n\`Чтобы добавить город используйте /создать [Название-города]\``)
				.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
			message.channel.send(embed);
	}
}