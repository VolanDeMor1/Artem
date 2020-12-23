const Discord = require('discord.js');
module.exports = {
	name: "purse-add",
	aliases: ["pa", "puradd", "казна-добавить", "кд", "казну-добавить"],
	description: "Создать казну.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
		let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены, что собираетесь создать казну **"${args.join(" ")}"**`)
        message.channel.send(e).then(msg => {
            msg.react('✅');
            collector(msg);
        });

        function success(msg, r, u){
            bot.purses[args.join(" ")] = {
                owner: message.author.id,
                available: [ message.author.id ],
                history: {},
                permissions: "PRIVATE",
                balance: 0,
            };
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Создание казны**`)
                .setColor('#1aff00')
                .setTimestamp()
                .setDescription(`> **Название:** ${args.join(" ")}\n> **Владелец:** <@${message.author.id}>`)
            msg.edit(embed);
            msg.reactions.removeAll();
        };

        function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setColor('#a6a6a6')
            .setDescription(`Создаю кластер...`)
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