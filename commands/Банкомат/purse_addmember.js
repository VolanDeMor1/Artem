const Discord = require('discord.js');
module.exports = {
	name: "purse-add-member",
	aliases: ["pam", "puraddmem", "казна-добавить-мембера", "кдм", "добавить-мембера-в-казну"],
	description: "Добавить пользователя в казну.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
        const user = message.mentions.members.last() || message.guild.members.cache.get(args[0]);

        if(!user){
			let embed = new Discord.MessageEmbed()
			.setTitle(`<:nope:751695799561486377> **Ошибка!**`)
			.setColor('#ff0000')
			.setDescription("Пользователь не найден")
	
			message.reply(embed);
			return "";
        }

        let find = false;
        for(let kazna in bot.purses){
            if(kazna == args.slice(1, 2048).join(" ")){
                find = true;
            }
        }

        if(!find){
			let embed = new Discord.MessageEmbed()
			.setTitle(`<:nope:751695799561486377> **Ошибка!**`)
			.setColor('#ff0000')
			.setDescription("Казна не найдена")
	
			message.reply(embed);
			return "";
        }

		let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены, что собираетесь добавить <@${user.id}> в казну **"${args.slice(1, 2048).join(" ")}"**?`)
        message.channel.send(e).then(msg => {
            msg.react('✅');
            collector(msg);
        });

        function success(msg, r, u){
            bot.purses[args.slice(1, 2048).join(" ")].available[bot.purses[args.slice(1, 2048).join(" ")].available.length] = user.id;
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Добавление пользователя в казну**`)
                .setColor('#1aff00')
                .setTimestamp()
                .setDescription(`> **Название казны:** ${args.slice(1, 2048).join(" ")}\n> **Владелец:** <@${message.author.id}>\n> **Добавлен:** <@${user.id}>`)
            msg.edit(embed);
            msg.reactions.removeAll();
        };

        function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setColor('#a6a6a6')
            .setDescription(`Добавляю айди...`)
            msg.edit(embed);
            return "";
        };

        function collector(msg){
            let c = msg.createReactionCollector((r, u) => !u.bot && u.id == message.author.id, {max: 1, time:600000});
            c.on("collect", (r, u) => {
                if(r.emoji.name !== '✅'){
                    clearreact(msg, u.id);
                    collector(msg);
                    return "";
                }else{
                    loading(msg, r, u);
                    setTimeout(success, 3500, msg, r, u);
                    return "";
                }
            });
        };

        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('✅')
                });
            }
        }
	}
}