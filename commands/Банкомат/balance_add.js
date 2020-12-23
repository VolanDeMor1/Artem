const Discord = require('discord.js');
module.exports = {
	name: "balance-add",
	aliases: ["ba", "add", "give", "добавить", "выдать"],
	description: "Выдать алмазную руду пользователю.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
		const user = message.mentions.members.last() || message.guild.members.cache.get(args.slice(1, 1000).join(" ")) || message.member;
        if(!message.member.roles.cache.has('773132924505686017') && message.author.id !== '575981243011956749'){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
            .setColor('#ff0000')
            .setDescription("У вас нет прав \n Это могут сделать только <@&773132924505686017> ")
            message.reply(embed);
            return "";
        }
		let e = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
            .setColor('#1aff00')
            .setDescription(`Вы уверены, что собираетесь выдать алмазную руду **<@${user.id}>**, в количестве ${args[0]} <:ap:772823205420204062>`)
        message.channel.send(e).then(msg => {
            msg.react('✅');
            collector(msg);
        });

        function success(msg, r, u){
            bot.profiles[user.id].bank.balance = Number(bot.profiles[user.id].bank.balance) + Number(args[0]);
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:yeah:751695766787063918> **Транзакция**`)
                .setColor('#1aff00')
                .setTimestamp()
                .setDescription(`> 💳 **Данные транзакции:**\n> **Банкир:** <@${message.author.id}>\n> **Клиент:** <@${user.user.id}>\n> **Сумма:** ${args[0]} <:ap:772823205420204062>`)
            msg.edit(embed);
            msg.reactions.removeAll();
        };

        function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setColor('#a6a6a6')
            .setDescription(`Пополнение баланса...`)
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