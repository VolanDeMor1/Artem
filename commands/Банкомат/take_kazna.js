const Discord = require('discord.js');
module.exports = {
	name: "take",
	aliases: ["tk", "забрать", "взять", "снять"],
	description: "Снять алмазную руду с казны.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
        let find = false;
        let availabilit = false;
        for(let kazn in bot.purses){
            if(kazn == args.slice(1, 2048).join(" ")){
                find = true;
                bot.purses[kazn].available.forEach(av => {
                    if(av == message.author.id){
                        availabilit = true;
                    }
                });
                if((bot.purses[kazn].permissions !== "ONLYREMOVE" || bot.purses[kazn].permissions !== "SOMEBODY") && !availabilit){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setDescription("Отказано в доступе")
                    message.reply(embed);
                    return;
                }
                if(args[0] < 1){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setDescription("Вы не можете указать сумму ниже 1 <:ap:772823205420204062>")
                    message.reply(embed);
                    return;
                }
                if(bot.purses[kazn].balance < args[0]){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setDescription("Вы не можете указать сумму больше баланса казны.")
                    message.reply(embed);
                    return;
                }
                if(!Number(args[0])){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setDescription("Вы неверно указали сумму перевода")
                    message.reply(embed);
                    return;
                }
                let e = new Discord.MessageEmbed()
                    .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
                    .setColor('#1aff00')
                    .setDescription(`Вы уверены, что собираетесь снять с счёта казны **"${kazn}"**, ${args[0]} <:ap:772823205420204062>?`)
                    .setTimestamp()
                message.channel.send(e).then(msg => {
                    msg.react('✅');
                    collect(msg);
                });

                function kazna(msg, r, u){
                    let e = new Discord.MessageEmbed()
                        .setTitle("<:wait:773184453505581068> **Обратите внимание**")
                        .setColor('#f5d442')
                        .setTimestamp()
                        .setDescription(`Напишите сообщение, которое будет содержать **коментарий** пополнения казны.\nДа, да, __это обязательно__`)
                        .setFooter(message.guild.name, message.guild.iconURL())
                    msg.edit(e);
                    msg.reactions.removeAll();
                    const filter = m => m.author.id == message.author.id;
                    const collectormsg = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });

                    collectormsg.on('collect', m => {
                        m.delete();
                        bot.purses[kazn].balance = Number(bot.purses[kazn].balance) - Number(Math.floor(args[0]));
                        bot.profiles[message.member.id].bank.balance = Number(bot.profiles[message.member.id].bank.balance) + Number(Math.floor(args[0]));
                        let embed = new Discord.MessageEmbed()
                            .setTitle("<:yeah:751695766787063918> **Транзакция**")
                            .setColor('#1aff00')
                            .setTimestamp()
                            .setDescription(`> 💳 **Данные транзакции:**\n> **Отправитель:** "${kazn}"\n> **Получатель:** <@${message.author.id}>\n> **Сумма:** ${Math.floor(args[0])} <:ap:772823205420204062>\n> **Коментарий:** ${m.content}`)
                        msg.edit(embed);
                        bot.users.fetch(bot.purses[kazn].owner).then(mm => mm.send(embed));
                        return;
                    });
                };

                function collect(msg){
                    let c = msg.createReactionCollector((r, u) => !u.bot && u.id == message.author.id, {max: 1, time:600000});
                    c.on("collect", (r, u) => {
                        if(r.emoji.name !== '✅'){
                            clearreact(msg, u.id);
                            collect(msg);
                            return "";
                        }else{
                            loading(msg, r, u);
                            setTimeout(kazna, 3500, msg, r, u);
                            return "";
                        }
                    });
                };
            }
        }

        if(!find){
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                .setColor('#ff0000')
                .setDescription("Казна не найдена")
            message.reply(embed);
            return;
        }

        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('✅')
                });}
        };

        async function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setColor('#a6a6a6')
            .setDescription(`Отправка средств...`)
            msg.edit(embed);
            return;
        };
	}
}