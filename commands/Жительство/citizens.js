const Discord = require('discord.js');
module.exports = {
	name: "citizens",
	aliases: ["ct", "ci", "жители", "ж"],
	description: "Жители того или иного города.",
	category: "",
	availability: false,
	run: async (message, args, bot) => {
		let toplist = '';
		for (let u in bot.cities[args.join(" ")].citizens) {
				toplist += `<@${u}> ― ${bot.cities[args.join(" ")].citizens[u].role}\n`;
		}
		if(!toplist){
			let embed = new Discord.MessageEmbed()
			.setTitle(`🚫 **Ошибка!**`)
			.setColor('#ff0000')
			.setTimestamp()
			.setDescription("Город не найден")
			.setFooter(message.guild.name, message.guild.iconURL())
	
			message.channel.send(embed);
			return "";
		}
			let embed = new Discord.MessageEmbed()
				.setTitle(`<a:smilecat:738121926668451921> Жители ${args.join(" ")}`)
				.setColor('#a200ff')
				.setDescription(toplist)
				.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
			message.channel.send(embed);
	}
}