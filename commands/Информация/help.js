const Discord = module.require('discord.js');
const fs = require('fs');

const availability = {
    true: "Доступна для всех",
    false: "Недоступна"
}

module.exports = {
	name: 'help',
    aliases: ["помощь", "h", "хелп", "х"],
	description: "Команда помощи по командам.",
	category: "",
	availability: true,
	run: async(message, args, bot) => {
        if(args[0]){
            let cmd =  bot.commands.get(bot.aliases.get(args[0])) || bot.commands.get(args[0]);
            if(!cmd){
                let embed = new Discord.MessageEmbed()
                .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
                .setColor('#ff0000')
                .setTimestamp()
                .setDescription("Команда не найдена")
                .setFooter(message.guild.name, message.guild.iconURL())
        
                message.channel.send(embed);
                return "";
            }else{
                const embed = new Discord.MessageEmbed();
                if(cmd.availability){
                    embed.setColor('#00ff2a');
                }else if(!cmd.availability){
                    embed.setColor('#ff0000');
                }
                embed.setFooter(message.guild.name, message.guild.iconURL());
                embed.setTimestamp();
                embed.setTitle(`**/${cmd.name} - ${cmd.description}**`);
                embed.addField(`> **Сокращения:**`, cmd.aliases.length ? cmd.aliases.map(alias => ` \`/${alias}\``) : 'Нет алиасов')
                embed.setDescription(`> **Категория:** \n ${cmd.category}\n\n**> Доступность:** ${availability[cmd.availability]}\n`);
                return message.channel.send(embed);
            }
        }
        const permissions = message.channel.permissionsFor(message.client.user);

        let pages = Math.ceil(bot.commands.size / 10);
        let nowPage = 1;
        let commandList = [];
        let minCommand = 0;
        let maxCommand = 10;
        let embed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor || 'RANDOM')
        .setTitle(`**Помощь по командам (${nowPage}/${pages}) - [Всего: ${bot.commands.size}]**`)
        .setDescription(`Чтобы узнать больше о команде\n\`/help <command>\``)
        .setFooter(message.guild.name, message.guild.iconURL());

        let auf = bot.commands.sort(function(a, b){
            return b.availability - a.availability;
            // return (a.availability === b.availability)? 0: a? -1: 1;
        });
        auf.forEach(comm =>{
            commandList.push({
                name: comm.name,
                description: comm.description,
                availability: comm.availability ? "<:yeah:751695766787063918>" : "<:nope:751695799561486377>"
            });
        });
        await doubleList(minCommand, maxCommand, embed);
        message.channel.send(embed).then(msg => {
            msg.react('◀️');
            msg.react('▶️');
            collector(msg);
        });
		

        function collector(msg) {
            let c = msg.createReactionCollector((r, u) => !u.bot && u.id == message.author.id, {max: 1, time:5*60000});
            c.on("collect", (r, u) => {
                if(r.emoji.name == '▶️'){
                    if(minCommand >= Number(bot.commands.size - 10) && maxCommand >= bot.commands.size){
                        if(permissions.has('MANAGE_MESSAGES')){
                            clearreact(msg, u.id);
                        }
                        collector(msg);
                        return;
                    }
                    console.log(minCommand + " | " + maxCommand)
                    console.log(minCommand + " >= " + Number(bot.commands.size - 10) + " && " + maxCommand + " >= " + bot.commands.size + " |||| " + (minCommand >= Number(bot.commands.size - 10) && maxCommand >= bot.commands.size))
                    forward(msg, u.id);
                    if(permissions.has('MANAGE_MESSAGES')){
                        clearreact(msg, u.id);
                    }
                    collector(msg);
                }else if(r.emoji.name == '◀️'){
                    if(minCommand <= 1 && maxCommand <= 10){
                        if(permissions.has('MANAGE_MESSAGES')){
                            clearreact(msg, u.id);
                        }
                        collector(msg);
                        return;
                    }
                    console.log(minCommand + " | " + maxCommand)
                    back(msg, u.id);
                    if(permissions.has('MANAGE_MESSAGES')){
                        clearreact(msg, u.id);
                    }
                    collector(msg);
                }else{
                    collector(msg);
                    if(permissions.has('MANAGE_MESSAGES')){
                        clearreact(msg, u.id);
                    }
                    return;
                }
            });
        };

        async function forward(msg, u){
            minCommand += 10;
            maxCommand += 10;
            nowPage++;
            let embeded = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle(`**Помощь по командам (${nowPage}/${pages}) - [Всего: ${bot.commands.size}]**`)
            .setDescription(`Чтобы узнать больше о команде\n\`/help <command>\``)
            .setFooter(message.guild.name, message.guild.iconURL())
            //.setDescription(doubleList(minCommand, maxCommand, embed));
            await doubleList(minCommand, maxCommand, embeded);
            msg.edit(embeded);
        }

        async function back(msg, u){
            minCommand -= 10;
            maxCommand -= 10;
            nowPage--;
            let embed = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .setTitle(`**Помощь по командам (${nowPage}/${pages}) - [Всего: ${bot.commands.size}]**`)
            .setDescription(`Чтобы узнать больше о команде\n\`/help <command>\``)
            .setFooter(message.guild.name, message.guild.iconURL())
            //.setDescription(doubleList(minCommand, maxCommand, embed));
            await doubleList(minCommand, maxCommand, embed);
            msg.edit(embed);
        }

        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('◀️')
                    msg.react('▶️')
                });}
        }

        function doubleList(ot, ido, embed) {
            commandList.slice(ot, ido).forEach(c => {
                embed.addField(`${c.availability} \`/${c.name}\``, `╘ ${c.description}`);
            });
            //return commandList.slice(ot, ido).map(value => `${value.availability} \`/${value.name}\` - ${value.description}`)
        }
	}
};
