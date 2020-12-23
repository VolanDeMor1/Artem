const Discord = require("discord.js");

module.exports = {
	name: "warnlist",
	aliases: ["wl", "преды", "предупреждения"],
	description: "Полный список предупреждений.",
	category: "",
	availability: true,
	run: (message, args, bot) => {
        const p = require('../../users.json');
        let arr = []
        Object.keys(p).forEach(u => {arr.push({id: u, warns: p[u].moderation.warns.cout})})
        arr.sort(function(a, b) {
          return b.warns - a.warns;
        });
        let topuser = arr.slice(0,15)
        let toplist = '';
        for (let u in topuser) {
          if(bot.guilds.cache.get(message.guild.id).members.cache.has(topuser[u].id) && topuser[u].warns >= 1){
            toplist += `<@${topuser[u].id}> - ${topuser[u].warns}/5\n`
          }
        }
                let embed = new Discord.MessageEmbed()
                    .setTitle("Топ-лист по количеству предупреждений")
                    .setColor('#4fa7ff')
                    .setDescription(toplist || "Пусто")
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL());
                message.channel.send(embed);
	}
}