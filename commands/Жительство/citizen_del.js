const Discord = require('discord.js');
module.exports = {
	name: "citizen-del",
	category: "",
	aliases: ["citizen-delete", "cd", "жительство-убрать", "жителя-убрать", "убрать-жителя"],
	description: "Команда с больши кол-вом функций.",
	availability: false,
	run: async (message, args, bot) => {
        let user = message.mentions.members.first();
        if(!user){
            let embed = new Discord.MessageEmbed ()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Пользователь не найден")
	    	.setFooter(message.guild.name, message.guild.iconURL())

            message.channel.send(embed);
            return "";
        }
        if(!bot.cities[args.slice(1, 9999).join(" ")]){
            let embed = new Discord.MessageEmbed ()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Город не найден\n\nВоспользуйтесь командой \`.города\`")
	    	.setFooter(message.guild.name, message.guild.iconURL())

            message.channel.send(embed);
            return "";
        }
        if(bot.cities[args.slice(1, 9999).join(" ")].mayor !== message.author.id){
            let embed = new Discord.MessageEmbed ()
            .setTitle(`🚫 **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Вы не можете убрать жителя из города, так как вы не являетесь мером города")
	    	.setFooter(message.guild.name, message.guild.iconURL())

            message.channel.send(embed);
            return "";
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(`<:yeah:751695766787063918> **Подтверждение**`)
        .setColor('#4dff7c')
        .setTimestamp()
        .setDescription(`Вы уверены что хотите убрать пользователя <@${user.id}>, из жителей города **${args.slice(1, 9999).join(" ")}**?`)
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed).then(msg => {
            msg.react('✅');
            collector(msg);
        })

        async function collector(msg){
            let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
            c.on("collect", (r, u) => {
                if(u.id !== message.author.id || r.emoji.name !== '✅'){
                    clearreact(msg, u.id);
                    collector(msg);
                    return "";
                }else{
                    success(msg, r, u);
                    return "";
                }
            });
        };

        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('✅')
                });}
        }

        async function success(msg, r, u){
            delete bot.cities[args.slice(1, 9999).join(" ")].citizens[user.id];
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:yeah:751695766787063918> **Успех!**`)
            .setColor('#4dff7c')
            .setTimestamp()
            .setDescription(`Вы убрали пользователя <@${user.id}>, из жителей города **${args.slice(1, 9999).join(" ")}**`)
            .setFooter(message.guild.name, message.guild.iconURL())
            msg.edit(embed);
            msg.reactions.removeAll();
        }
	}
}