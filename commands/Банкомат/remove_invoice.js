const Discord = require('discord.js');
module.exports = {
	name: "invoice-remove",
	aliases: ["invoice-rem", "ir", "разинвойс", "uninvoice", "inv-del"],
	description: "Убрать инвойс у пользователя.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
		const user = message.mentions.members.last() || message.guild.members.cache.get(args.slice(1, 100).join(" ")) || message.member;
        if(!message.member.roles.cache.has('773132924505686017')){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
            .setColor('#ff0000')
            .setDescription("У вас нет прав \n Это могут сделать только <@&773132924505686017> ")
            message.channel.send(embed);
            return "";
        }

		let find = false;
        for(let a in bot.profiles[user.id].bank.invoices){
			console.log(a + " || " + args[0]);
			if(a == args[0]){
				find = true;
				let e = new Discord.MessageEmbed()
					.setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
					.setColor('#1aff00')
					.setDescription(`Вы уверены, что собираетесь убрать инвойс **<@${user.id}>** с номером **#${args[0]}**, на сумму ${bot.profiles[user.id].bank.invoices[a].value} <:ap:772823205420204062>, с коментарием ${bot.profiles[user.id].bank.invoices[a].reason}`)
				message.channel.send(e).then(msg => {
					msg.react('✅');
					collector(msg);
				});
			};
		};

		if(!find){
			let embed = new Discord.MessageEmbed()
			.setTitle(`<:nope:751695799561486377> **Ошибка!**`)
			.setColor('#ff0000')
			.setDescription("Инвойс не найден")
	
			message.channel.send(embed);
			return "";
		}

        function success(msg, r, u){
            let embed = new Discord.MessageEmbed()
                .setTitle("<:yeah:751695766787063918> **Удаление инвойса**")
                .setColor('#1aff00')
                .setTimestamp()
                .setDescription(`> 💳 **Данные инвойса:**\n> **Банкир:** <@${message.author.id}>\n> **Клиент:** <@${user.user.id}>\n> **Сумма:** ${args[0]} <:ap:772823205420204062>\n> **Коментарий:** ${bot.profiles[user.id].bank.invoices[args[0]].reason || "Не указана"}`)
            msg.edit(embed);
            msg.reactions.removeAll();
            delete bot.profiles[user.id].bank.invoices[args[0]];
        };

        function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setColor('#a6a6a6')
            .setDescription(`Удаление...`)
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