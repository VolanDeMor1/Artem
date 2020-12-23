const Discord = require('discord.js');
module.exports = {
	name: "create",
	aliases: ["создать", "добав-город"],
	description: "Добавить город в БД.",
	category: "",
	availability: false,
	run: async (message, args, bot) => {
        let e = new Discord.MessageEmbed()
        .setTitle(`**Подтверждение 📊**`)
        .setColor('#4dff7c')
        .setTimestamp()
        .setDescription(`Вы уверены, что хотите добавить город под названием **${args.slice(0, 9999).join(" ")}**?\nПозже, только вы сможете управлять внешним видом вашего города, в команде \`/city\`!`)
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(e).then(msg => {
            collector(msg);
            msg.react('✅')
        })
        
        async function confirmed(msg){
            console.log(bot.cities);
            bot.cities[args.slice(0, 100).join(" ")] = {
                mayor:message.author.id,
                description:"Чтобы указать описание или изменить его напишите команду \`/изменить описание\`",
                image:"",
                emoji:"<:yeah:751695766787063918>",
                color:"#ff6969",
                citizens:{

                },
                blacklist:{
                    
                }
            };
            bot.cities[args.slice(0, 100).join(" ")].citizens[message.author.id] = {
                role: "Мер"
            };
            message.member.roles.add(bot.guilds.cache.get('768484130308227132').roles.cache.get('771055315150962708'));
            const embed = new Discord.MessageEmbed()
            .setDescription("**Добавление <a:smilecat:738121926668451921>**")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('#fff200')
            .setTimestamp()
            .addField("Мер",`<@${message.author.id}>`)
            .addField("Город", `${args.slice(0, 100).join(" ")}`, true)
        
            msg.edit(embed);
            msg.reactions.removeAll();
        }

        async function loading(msg, r, u){
            let embed = new Discord.MessageEmbed()
            .setTitle("<a:aiva_load:757138869748498522> **Загрузка**")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('#a6a6a6')
            .setTimestamp()
            .setDescription(`Создаю кластер...`)
            msg.edit(embed);
            return "";
        };
        
        async function clearreact(msg, uid){
            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(uid));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(uid).then(()=>{
                    msg.react('✅')
                });}
        }

        function collector(msg) {
            let c = msg.createReactionCollector((r, u) => !u.bot, {max: 1, time:600000});
            c.on("collect", (r, u) => {
                if(u.id !== message.author.id || r.emoji.name !== '✅'){
                    collector(msg);
                    clearreact(msg, u.id)
                    return "";
                }else{
                    loading(msg);
                    setTimeout(confirmed, 3500, msg);
                }
            });
        };
	}
}