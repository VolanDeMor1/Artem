const Discord = require('discord.js');
const { format } = require('formatnumbers');
module.exports = {
	name: "balance",
	aliases: ["b", "баланс", "счёт"],
	description: "Информация о балансе пользователя.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
		const user = message.mentions.members.last() || message.guild.members.cache.get(args.join(" ")) || message.member;
		let vivsti = `У <@${user.id}>`;
		if(user.id == message.member.id) vivsti = `У вас`;
		let embed = new Discord.MessageEmbed()
            .setTitle(`**Баланс**`)
            .setColor('#f0f0f0')
            .setDescription(`${vivsti} на счету **${format(bot.getProfileByID(user.id).bank.balance)} <:ap:772823205420204062>**`)
        message.channel.send(embed);
	}
}