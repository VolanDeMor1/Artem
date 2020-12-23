const Discord = require('discord.js');

module.exports = {
	name: "block",
	category: "",
	aliases: ["bl", "блокировка", "блок"],
	description: "Статус блокировки команды.",
	availability: false,
	run: (message, args, bot) => {
        const cmd = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]));
        if(cmd && args[1] && !Number(args[1])){
            const embed = new Discord.MessageEmbed();
            if(args[1].includes("true")){
                bot.commands.get(args[0]).availability = true;
                embed.setColor('#00ff2a');
            }else if(args[1].includes("false")){
                bot.commands.get(args[0]).availability = false;
                embed.setColor('#ff0000');
            }
			embed.setFooter(message.guild.name, message.guild.iconURL());
            embed.setTimestamp();
            embed.setTitle(`\`/${cmd.name} - Блокировка\``);
            embed.setDescription([
				`**> Сокращения:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'Нет алиасов'}`,
				`**> Описание:** \`${cmd.description}\``,
                `**> Доступность:** \`${cmd.availability}\``,
            ]);
            message.channel.send(embed);
        }else if(cmd && !args[1]){
            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
			.setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setTitle(`\`/${cmd.name} - Блокировка\``)
            .setDescription([
				`**> Сокращения:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'Нет алиасов'}`,
				`**> Описание:** \`${cmd.description}\``,
                `**> Доступность:** \`${cmd.availability}\``,
            ]);
            message.channel.send(embed);
        }
	}
}