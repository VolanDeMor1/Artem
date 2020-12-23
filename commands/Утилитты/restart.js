const Discord = module.require('discord.js');

module.exports = {
	name: 'restart',
	category: "",
	description: 'Перезапустить бота.',
    aliases: ["rest", "reboot", "рестарт"],
    availability: false,
    run: async (message, args) => {
		if (message.author.id !== '575981243011956749') {
			const embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription('У вас нет прав')

			message.channel.send(embed);
			return '';
		}
		try {
            const ping = new Date().getTime() - message.createdTimestamp;
            const embed = new Discord.MessageEmbed()
                .setColor('#03fc03')
                .setDescription(`Бот успешно перезапущен!`)
                .addField('Пинг:', `${ping}ms`, true)
                .setTimestamp()
                .setFooter(`${message.author.username} | ${message.guild.name}`, message.author.avatarURL());

            await message.channel.send(embed)
            require("child_process").execSync("forever restart index.js");
		} catch (e) {
			const embed = new Discord.MessageEmbed()
				.setTitle("🚫 **Внимание!**")
				.setColor('#ff4f4f')
				.setTimestamp()
				.setDescription(`\`\`\`${e}\`\`\``)
				.setFooter(`${message.author.username} | ${message.guild.name}`, message.guild.iconURL());

			message.channel.send(embed);
		}
	}
};
