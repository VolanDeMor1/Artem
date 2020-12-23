const Discord = require('discord.js');
module.exports = {
	name: "purse-rem",
	aliases: ["pr", "purrem", "казна-удалить", "ку", "казну-удалить"],
	description: "Удалить казну.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {

        let find = false;
        for(let kazna in bot.purses){
            if(kazna == args.join(" ")){
                find = true;
            }
        }

        if(!find){
			let embed = new Discord.MessageEmbed()
			.setTitle(`<:nope:751695799561486377> **Ошибка!**`)
			.setColor('#ff0000')
			.setDescription("Казна не найдена")
	
			message.channel.send(embed);
			return "";
        }

		let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены, что собираетесь удалить казну **"${args.join(" ")}"**`)
        message.channel.send(e).then(msg => {
            msg.react('✅');
            collector(msg);
        });

        function success(msg, r, u){
            delete bot.purses[args.join(" ")];
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Удаление казны**`)
                .setColor('#1aff00')
                .setTimestamp()
                .setDescription(`> **(Бывшее) Название:** ${args.join(" ")}\n> **(Бывший) Владелец:** <@${message.author.id}>`)
            msg.edit(embed);
            msg.reactions.removeAll();
        };

        function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setColor('#a6a6a6')
            .setDescription(`Удаляю кластер...`)
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