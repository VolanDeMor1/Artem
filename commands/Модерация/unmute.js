const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "unmute",
	aliases: ["umt", "размут", "смут", "unm", "um"],
	description: "Снять мут с пользователя.",
	category: "",
	availability: true,
	run: (message, args, bot) => {
		const user = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
        if(!message.member.roles.cache.has("768890481747820595")){
            let embed = new MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У вас недостаточно прав ")
			.setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return "";
        }
        if(!user){
            let embed = new MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Пользователь не найден ")
			.setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        }
        if(!user.roles.cache.has('768890525277093938')){
            let embed = new MessageEmbed()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Этот пользователь не замучен")
			.setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return "";
        }
        let role = message.guild.roles.cache.get('768890525277093938');
		if(!bot.profiles[user.user.id]){
            bot.createProfile(user.user.id);
		}
        user.roles.remove(role);
    	bot.profiles[user.user.id].moderation.mute = {
			status: false,
			time: 0,
			channel: 0
		};
		let embed = new MessageEmbed()
            .setTitle("<:yeah:751695766787063918> **РазМут**")
            .setColor('#2f3136')
            .addField("**Размутил:**",`<@${message.author.id}>`, true)
            .addField("**Нарушитель:**",`<@${user.id}>`, true)
			.setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        user.send(embed);
	}
}