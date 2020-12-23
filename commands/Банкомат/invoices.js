const Discord = require('discord.js');
module.exports = {
	name: "invoises",
	aliases: ["inv", "i", "инвойсы"],
	description: "Показывают инвойсы того или иного игрока.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
        const user = message.mentions.members.last() || message.guild.members.cache.get(args.join(" ")) || message.member;
        let str = "";
        for(let a in bot.profiles[user.id].bank.invoices){
            str += `**#${a}** Ч${require('moment')(user.profile().bank.invoices[a].date).locale('ru').endOf('day').fromNow().slice(1, 10000)},  ${user.profile().bank.invoices[a].value} <:ap:772823205420204062> - ${user.profile().bank.invoices[a].reason}\n`;
        }
		let embed = new Discord.MessageEmbed()
            .setTitle(`**Инвойсы ${user.displayName}**`)
            .setColor(user.displayHexColor || "RANDOM")
            .setDescription(str)
        message.channel.send(embed);
	}
}