const Discord = require('discord.js');
const { format } = require('formatnumbers');

module.exports = {
	name: "purse",
	aliases: ["pr", "казна"],
	description: "Панель управления казной.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {

        let find = false;
        let purse;

        for(let a in bot.purses){
            if(a == args.join("")){
                find = true;
                purse = a;
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

        if(!bot.utils.checkPermissions(args, message.author.id)){
			let embed = new Discord.MessageEmbed()
			.setTitle(`<:nope:751695799561486377> **Ошибка!**`)
			.setColor('#ff0000')
			.setDescription("Отказано в доступе")
			message.channel.send(embed);
			return "";
        }

        let count = 0;
        if(find){
            bot.purses[purse].available.forEach(mm => {
                count++;
            });
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:ip:773137348758077442> ` + purse + " **- Панель управления**")
                .setColor(message.member.displayHexColor)
                .setDescription(`> <:wtf:764774529104740373> **Описание:**\n${/*bot.cities[purse].description || */"Пока не доступно("}`)
                .addField(`\n> <a:search:756225029095686245> **Информация:**`, `> **Владелец:** <@${bot.purses[purse].owner}>\n> **Игроки с доступом:** ${await count}`, true)
                .addField(`\n> <a:smilecat:738121926668451921> **Доп. Информация:**`, `> **Счёт:** ${format(bot.purses[purse].balance)} <:ap:772823205420204062>\n> **Тип доступа:** ${bot.purses[purse].permissions}`, true)
                .addField(`\n> **Действия с казной:**`, `\n> 👑 - Вернуться на главную\n> 👥 -  Просмотреть список игроков с доступом к казне\n> <:ip:773137348758077442> - Положить ары на счёт казны\n> <a:think:764115653518032906> - Снять ары со счёта казны\n> <a:clock:773864159535824896> - Посмотреть историю операций казны\n> <:discord:732918491581120563> - Добавить пользователя в приватный список`)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(embed).then(msg => {
                msg.react('👑');
                msg.react('👥');
                msg.react('773137348758077442');
                msg.react('764115653518032906');
                msg.react('773864159535824896');
                msg.react('732918491581120563');
                collector(msg);
            });
        }

        function main(msg){
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:ip:773137348758077442> ` + purse + " **- Панель управления**")
                .setColor(message.member.displayHexColor)
                .setDescription(`> <:wtf:764774529104740373> **Описание:**\n${/*bot.cities[purse].description || */"Пока не доступно("}`)
                .addField(`\n> <a:search:756225029095686245> **Информация:**`, `> **Владелец:** <@${bot.purses[purse].owner}>\n> **Игроки с доступом:** ${count}`, true)
                .addField(`\n> <a:smilecat:738121926668451921> **Доп. Информация:**`, `> **Счёт:** ${format(bot.purses[purse].balance)} <:ap:772823205420204062>\n> **Тип доступа:** ${bot.purses[purse].permissions}`, true)
                .addField(`\n> **Действия с казной:**`, `\n> 👑 - Вернуться на главную\n> 👥 -  Просмотреть список игроков с доступом к казне\n> <:ip:773137348758077442> - Положить ары на счёт казны\n> <a:think:764115653518032906> - Снять ары со счёта казны\n> <a:clock:773864159535824896> - Посмотреть историю операций казны\n> <:discord:732918491581120563> - Добавить пользователя в приватный список`)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
            msg.edit(embed);
        }

        function membersList(msg){
            let str = " ";
            let a = 1;
            bot.purses[purse].available.forEach(mm => {
                str += `**${a++}.** <@${mm}>\n`;
            });
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:ip:773137348758077442> ` + purse + " **- Приватный список**")
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            .setDescription(str)
            .setFooter(`👑 - Вернуться на главную`);
            msg.edit(embed);
        }

        function addPay(msg){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:ip:773137348758077442> ` + purse + " **- Пополнение счёта**")
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            .setDescription(`Напишите __сообщение__ которое будет содержать __сумму__ которую вы планируете __**положить**__ на счёт казны`)
            msg.edit(embed);
            messageCollectorAdd(msg, true);
        }

        function messageCollectorAdd(msg, trueOrFalse, d3){
            if(trueOrFalse){
                const filter = m => m.author.id == message.author.id && Number(m.content);
                const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
                collector.on('collect', m => {
                    console.log(bot.utils.checkBalance(msg, bot.profiles[message.member.id].bank.balance, m.content) + ' || ' + m.content + " - сумма || " + bot.profiles[message.member.id].bank.balance + " - баланс")
                    if(bot.utils.checkBalance(msg, bot.profiles[message.member.id].bank.balance, m.content)){
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`<:ip:773137348758077442> ` + purse + " **- Пополнение счёта**")
                        .setColor(message.member.displayHexColor)
                        .setTimestamp()
                        .setDescription(`Напишите __сообщение__ которое будет содержать __коментарий__ пополнения казны`)
                        msg.edit(embed);
                        messageCollectorAdd(msg, false, m.content);
                        m.delete();
                    }else{
                        setTimeout(() => {
                            main(msg);
                        }, 15000);
                    }
                });
            }else if(!trueOrFalse){
                if(d3 > bot.profiles[message.author.id].bank.balance){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setDescription("Вы не можете пополнить ар больше, чем у вас на счету")
                    msg.edit(embed);
                    return;
                }
                const filter = m => m.author.id == message.author.id;
                const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
                collector.on('collect', m => {
                    bot.purses[purse].balance = Number(bot.purses[purse].balance) + Number(Math.floor(d3));
                    bot.profiles[message.member.id].bank.balance = Number(bot.profiles[message.member.id].bank.balance) - Number(Math.floor(d3));
                    bot.purses[purse].history[Date.now()] = {
                        client: message.author.id,
                        message: m.content,
                        summa: d3
                    };
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:ip:773137348758077442> ` + purse + " **- Пополнение счёта**")
                    .setColor(message.member.displayHexColor)
                    .setTimestamp()
                    .setDescription(`Вы успешно перевели **${format(Math.floor(d3))}** <:ap:772823205420204062>, на счёт казны **"${purse}"**, с коментарием "${m.content}"`)
                    .setFooter(`Вас вернёт на главную страницу через 15 секунд`);
                    msg.edit(embed);
                    setTimeout(() => {
                        main(msg);
                    }, 15000);
                    setTimeout(() => {
                        m.delete();
                    }, 1000);
                });
            }
        }

        function remPay(msg){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:ip:773137348758077442> ` + purse + " **- Снятие алмазной руды**")
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            .setDescription(`Напишите __сообщение__ которое будет содержать __сумму__ которую вы планируете __**снять**__ со счёта казны`)
            msg.edit(embed);
            messageCollectorRem(msg, true);
        }

        function messageCollectorRem(msg, trueOrFalse, d3){
            if(trueOrFalse){
                const filter = m => m.author.id == message.author.id && Number(m.content);
                const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
                collector.on('collect', m => {
                    console.log(bot.utils.checkBalance(msg, bot.profiles[message.member.id].bank.balance, m.content) + ' || ' + m.content + " - сумма || " + bot.profiles[message.member.id].bank.balance + " - баланс")
                    if(bot.utils.checkBalance(msg, bot.profiles[message.member.id].bank.balance, m.content)){
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`<:ip:773137348758077442> ` + purse + " **- Снятие алмазной руды**")
                        .setColor(message.member.displayHexColor)
                        .setTimestamp()
                        .setDescription(`Напишите __сообщение__ которое будет содержать __коментарий__ снятия алмазной руды`)
                        msg.edit(embed);
                        messageCollectorRem(msg, false, m.content);
                        m.delete();
                    }else{
                        setTimeout(() => {
                            main(msg);
                        }, 15000);
                    }
                });
            }else if(!trueOrFalse){
                if(d3 > bot.purses[purse].balance){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                    .setColor('#ff0000')
                    .setDescription("Вы не можете снять ар больше, чем на счету в казне")
                    msg.edit(embed);
                    return;
                }
                const filter = m => m.author.id == message.author.id;
                const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
                collector.on('collect', m => {
                    bot.purses[purse].balance = Number(bot.purses[purse].balance) - Number(Math.floor(d3));
                    bot.profiles[message.member.id].bank.balance = Number(bot.profiles[message.member.id].bank.balance) + Number(Math.floor(d3));
                    bot.purses[purse].history[Date.now()] = {
                        client: message.author.id,
                        message: m.content,
                        summa: `-${d3}`
                    };
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:ip:773137348758077442> ` + purse + " **- Снятие алмазной руды**")
                    .setColor(message.member.displayHexColor)
                    .setTimestamp()
                    .setDescription(`Вы успешно сняли **${format(Math.floor(d3))}** <:ap:772823205420204062>, со счёта казны **"${purse}"**, с коментарием "${m.content}"`)
                    .setFooter(`Вас вернёт на главную страницу через 15 секунд`);
                    msg.edit(embed);
                    setTimeout(() => {
                        main(msg);
                    }, 15000);
                    setTimeout(() => {
                        m.delete();
                    }, 1000);
                });
            }
        }

        async function history(msg){
            let arr = [];
            Object.keys(bot.purses[purse].history).forEach(d => {arr.push({date: d, message: bot.purses[purse].history[d].message, summa: bot.purses[purse].history[d].summa, client: bot.purses[purse].history[d].client})})
            arr.sort(function(a, b) {
              return b.date - a.date;
            });
            let otsort = arr.slice(0, 5);
            let str = " ";
            for(let mm in otsort){
                console.log(mm + " || " + otsort[mm].client)
                await message.guild.members.fetch(otsort[mm].client).then(mem => {
                    str += `\`\`\`cs\n${require('moment')(Number(otsort[mm].date)).locale('ru').format('lll')} |  ${mem.displayName} | ${format(otsort[mm].summa)} ар\n# Коментарий: ${otsort[mm].message}\`\`\`\n`
                });
                // str += `${require('moment')(Number(mm)).locale('ru').format('lll')} <@${bot.purses[purse].history[mm].client}>, **${format(bot.purses[purse].history[mm].summa)} <:ap:772823205420204062>**\n`;
            }
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:ip:773137348758077442> ` + purse + " **- История операций**")
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            .setDescription(str)
            .setFooter(`👑 - Вернуться на главную`);
            msg.edit(embed);
        }

        function addMember(msg){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:ip:773137348758077442> ` + purse + " **- Добваление пользователя**")
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            .setDescription(`Напишите __сообщение__ которое будет содержать __упоминание или айди__ пользователя которого вы планируете __**добавить**__ в приватный список`)
            msg.edit(embed);
            messageCollectorAddMem(msg);
        }

        function messageCollectorAddMem(msg){
            const filter = m => ((m.author.id == message.author.id) && (m.mentions.members.last() || message.guild.members.cache.get(m.content)));
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
            collector.on('collect', m => {
                const user = m.mentions.members.last() || message.guild.members.cache.get(m.content);

                let fffind = false;
                bot.purses[purse].available.forEach(mmmmm => {
                    if(mmmmm == user.id){
                        fffind = true;
                    }
                });

                if(!fffind){
                    bot.purses[purse].available[bot.purses[purse].available.length] = user.id;
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:ip:773137348758077442> ` + purse + " **- Добавление пользователя**")
                    .setColor(message.member.displayHexColor)
                    .setTimestamp()
                    .setDescription(`Вы успешно добавили <@${user.id}> в приватный список казны **"${purse}"**`)
                    .setFooter(`Вас вернёт на главную страницу через 15 секунд`);
                    msg.edit(embed);
                    setTimeout(() => {
                        main(msg);
                    }, 15000);
                    setTimeout(() => {
                        m.delete();
                    }, 1000);
                }else if(fffind){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`<:ip:773137348758077442> ` + purse + " **- Добавление пользователя**")
                    .setColor(message.member.displayHexColor)
                    .setTimestamp()
                    .setDescription(`Этот пользователь уже есть в приватном списке`)
                    .setFooter(`Вас вернёт на главную страницу через 15 секунд`);
                    msg.edit(embed);
                    setTimeout(() => {
                        main(msg);
                    }, 15000);
                    setTimeout(() => {
                        m.delete();
                    }, 1000);
                }
            });
        }

        function collector(msg){
            let c = msg.createReactionCollector((r, u) => !u.bot && u.id == message.author.id, {max: 1, time:600000});
            c.on("collect", (r, u) => {
                if(r.emoji.name == '👥'){
                    membersList(msg);
                    collector(msg);
                    clearreact(msg, u.id);
                    return "";
                }else if(r.emoji.name == '👑'){
                    main(msg);
                    collector(msg);
                    clearreact(msg, u.id);
                    return "";
                }else if(r.emoji.id == '773137348758077442'){
                    addPay(msg);
                    collector(msg);
                    clearreact(msg, u.id);
                    return "";
                }else if(r.emoji.id == '764115653518032906'){
                    remPay(msg);
                    collector(msg);
                    clearreact(msg, u.id);
                    return "";
                }else if(r.emoji.id == '773864159535824896'){
                    history(msg);
                    collector(msg);
                    clearreact(msg, u.id);
                    return "";
                }else if(r.emoji.id == '732918491581120563'){
                    addMember(msg);
                    collector(msg);
                    clearreact(msg, u.id);
                    return "";
                }else{
                    clearreact(msg, u.id);
                    collector(msg);
                    return "";
                }
            });
        }

        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('👑');
                    msg.react('👥');
                    msg.react('773137348758077442');
                    msg.react('764115653518032906');
                    msg.react('773864159535824896');
                    msg.react('732918491581120563');
                });
            }
        }
	}
}