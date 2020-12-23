const Discord = require('discord.js');
module.exports = {
	name: "city",
	aliases: ["c", "город"],
	description: "Подробная информация об городе.",
	category: "",
	availability: false,
	run: async (message, args, bot) => {
        let f = 0;
        let j = 1;
        let o = 0;
        let a = 0;
        if(!bot.cities[args.slice(0, 9999).join(" ")]){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Город не найден в Базе Данных")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }
        for(let u in bot.cities[args.slice(0, 9999).join(" ")].citizens){
            j++;
            f++;
            bot.users.cache.filter(us => us.presence.status !== "offline").forEach(us => {
                if(us.id == u){
                    o++;
                }
            });
        }
        for(let u in bot.cities[args.slice(0, 9999).join(" ")].blacklist){
            a++;
        }
        let embed = new Discord.MessageEmbed()
            .setTitle((bot.cities[args.slice(0, 9999).join(" ")].emoji) + ` ` + args.slice(0, 9999).join(" "))
            .setColor(bot.cities[args.slice(0, 9999).join(" ")].color)
            .setDescription(`> <:wtf:764774529104740373> **Описание:**\n${bot.cities[args.slice(0, 9999).join(" ")].description}`)
            .addField(`\n> <a:search:756225029095686245> **Информация:**`, `> **Жителей:** ${await f}\n> **Мер:** <@${bot.cities[args.slice(0, 9999).join(" ")].mayor}>`, true)
            .addField(`\n> <a:smilecat:738121926668451921> **Доп. Информация:**`, `> **В чёрном списке:** ${a}\n> **Жителей в сети:** ${o}`, true)
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/770716084147847208/771054704033660938/search--v2.png?width=1024&height=1024')
            .setImage(bot.cities[args.slice(0, 9999).join(" ")].image)
            .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(embed);
	}
}