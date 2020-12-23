const Discord = module.require('discord.js');
module.exports = {
	name: "mute",
	aliases: ["mt", "мут", "замутить"],
	description: "Замутить пользователя.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
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
        let role = message.guild.roles.cache.get('768890525277093938');
        if(!role){
            role = await message.guild.createRole({
                name:"Замучен",
                permissions:[]
            });
            message.guild.channels.cache.filter(ch => ch.type == "text").forEach(async (channel,id) => {
                await channel.overwritePermissions(role,{
                    SEND_MESSAGES:false,
                    ADD_REACTIONS:false
                });
            });
        };
        if(!args[1]){
            user.roles.add(role);
            let embed = new Discord.MessageEmbed()
                .setTitle("<:yeah:751695766787063918> **Мут**")
                .setColor('#ff1100')
                .addField("**Замутил:**",`<@${message.author.id}>`, true)
                .addField("**Нарушитель:**",`<@${user.id}>`, true)
                .addField("**Время (в минутах):**", "Бесконечно", true)
                .addField("**Причина:**", "Не указана")
                .setThumbnail(user.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed)
            user.send(embed);
            return;
        }
		if(!bot.profiles[user.user.id]){
            bot.createProfile(user.user.id);
		}
        user.roles.add(role);
    	bot.profiles[user.user.id].moderation.mute = {
			status: true,
			time: Date.now() + (args[1]*60000),
			channel: message.channel.id
		};
		let embed = new Discord.MessageEmbed()
            .setTitle("<:yeah:751695766787063918> **Мут**")
            .setColor('#2f3136')
            .addField("**Модератор:**",`<@${message.author.id}>`, true)
            .addField("**Нарушитель:**",`<@${user.id}>`, true)
            .addField("**Время (в минутах):**", args[1], true)
			.addField("**Причина:**", `${args.slice(2, 1000) || "Не указана"}.`)
			.setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        user.send(embed);
	}
}