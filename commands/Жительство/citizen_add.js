const Discord = require('discord.js');
module.exports = {
	name: "citizen-add",
	category: "",
	aliases: ["жительство-добавить", "житель-добавить", "добавить-жителя", "ca"],
	description: "Добавить игрка в город.",
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
            .setDescription("Вы не можете добавить жителя в этот город, так как вы не являетесь мером города")
	    	.setFooter(message.guild.name, message.guild.iconURL())

            message.channel.send(embed);
            return "";
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(`**Подтверждение 📊**`)
        .setColor('#4dff7c')
        .setTimestamp()
        .setDescription(`Напишите сообщение которое будет содержать роль в городе  для <@${user.id}>`)
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed).then(msg => {
            collectorMES(msg);
        })

        async function collectorMES(msg){
            const filter = m => m.author.id == message.author.id;
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
            collector.on('collect', m => {
                bot.cities[args.slice(1, 9999).join(" ")].citizens[user.id] = {
                    role:m.content
                };
                let em = new Discord.MessageEmbed()
                .setTitle(`**Изменение жительства**`)
                .setColor('#f0f0f0')
                .setTimestamp()
                .setDescription(`> **Роль в городе:** ${m.content}\n> **Город:** ${args.slice(1, 9999).join(" ")}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                m.channel.send(em);
                
            });
        }
	}
}