const Discord = require('discord.js');

module.exports = {
	name: "ban",
	aliases: ["бан", "забанить"],
	description: "Забанить пользователя.",
	category: "",
	availability: true,
	run: (message, args, bot) => {
		const user = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
        if(!message.member.roles.cache.has("768890481747820595")){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У вас недостаточно прав ")
			.setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return "";
        }
        if(user.roles.cache.has('768890481747820595')){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У этого пользователя иммунитет")
			.setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return "";
        }
        if(!user){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Пользователь не найден ")
			.setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        }
		if(!bot.profiles[user.user.id]){
            bot.createProfile(user.user.id);
		}
		let embed = new Discord.MessageEmbed()
            .setTitle("<:yeah:751695766787063918> **Бан**")
            .setColor('#2f3136')
            .addField("**Модератор:**",`<@${message.author.id}>`, true)
            .addField("**Нарушитель:**",`<@${user.id}>`, true)
			.addField("**Причина:**", `${args.slice(2, 1000).join(" ") || "Не указана"}.`)
			.setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        user.send(embed).then(() => {
			user.ban();
		})
	}
}