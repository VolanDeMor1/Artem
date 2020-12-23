const Discord = require('discord.js');

module.exports = {
	name: "clear",
	aliases: ["cl", "c", "очистить", "удалить", "уд"],
	description: "Удалить несколько сообщений.",
	category: "",
	availability: true,
	run: (message, args, bot) => {
        if(!message.member.roles.cache.has("768890481747820595")){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("У вас недостаточно прав")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        };
        if(args[0] > 99){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Укажите число меньше 99")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        };
        if(args[0] < 1){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
            .setColor('#ff0000')
            .setTimestamp()
            .setDescription("Укажите число больше 0")
            .setFooter(message.guild.name, message.guild.iconURL())
    
            message.channel.send(embed);
            return "";
        };
        let embed = new Discord.MessageEmbed()
        .setTitle(`**Успешно**`)
        .setColor('#2f3136')
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
    
        message.channel.bulkDelete(Number(args[0]) + 1).then(msgs =>{
			embed.setDescription(`${Number(msgs.size) - 1} сообщений удалено!`)
            message.channel.send(embed).then(msg => msg.delete({ timeout: 5*1000 }));
        });
	}
}