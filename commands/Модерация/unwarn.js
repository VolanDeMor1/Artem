const Discord = require("discord.js");

module.exports = {
	name: "unwarn",
	category: "",
	aliases: ["uw", "unw", "убратьпред", "забратьпред", "разпред"],
	description: "Забрать предупреждение с пользователя.",
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
        if(bot.profiles[user.user.id].moderation.warns.cout <= 0){
            let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У пользователя и так минимальное количество предупреждений")
			.setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        }
    	bot.profiles[user.user.id].moderation.warns.cout--;
    	bot.profiles[user.user.id].moderation.warns.channel = message.channel.id;
		let embed = new Discord.MessageEmbed()
            .setTitle("<:yeah:751695766787063918> **Разпредупреждение**")
            .setColor('#2f3136')
            .addField("**Модератор:**",`<@${message.author.id}>`, true)
            .addField("**Нарушитель:**",`<@${user.id}> (Предов: ${bot.profiles[user.user.id].moderation.warns.cout}/5)`, true)
			.setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        user.send(embed);
	}
}