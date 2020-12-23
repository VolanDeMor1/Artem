const Discord = require("discord.js");
const { format } = require("formatnumbers");
const os = require('os');
const moment = require('moment');


module.exports = {
	name: "bot-info",
	aliases: ["bi", "bot", "бот", "ботик"],
	description: "Подробная информация о системе бота.",
	category: "",
	availability: true,
	run: (message, args, bot) => {
		let prosessor = os.cpus()[0].model;
		let gbmem = Number(os.totalmem() / 1073741824.2).toFixed(2);
		let gbmemo = Number(os.freemem() / 1073741824.2).toFixed(2);
		let b = Number(gbmem).toFixed(2) - Number(gbmemo).toFixed(2);
		let a = os.uptime() * 1000;
		let embed = new Discord.MessageEmbed()
		.setAuthor("Информация о мне", bot.user.avatarURL())
		.setColor('RANDOM')
		.setDescription(`[Техническая поддержка](https://discord.gg/gZACqrX)\n`)
		.setTimestamp()
		.addField(`> **💻 Система:**`, `> **Версия DJS:** ${Discord.version}\n> **Версия NodeJS:** ${require("child_process").execSync("node -v").toString().replace("\n", "").replace("v", "")}\n> **Версия Java:** 11.0.6\n> **Аптайм:** ${moment(a).format('HH:mm:ss')}\n> **Процессор:** ${prosessor}\n> **Платформа:** ${os.platform()} ${os.release()}\n> **ОЗУ:** ${Number(b).toFixed(2)}гб/${gbmem}гб`, true)
		.addField(`> **🗿 Социальное:**`, `> **Гильдии:** ${format(bot.guilds.cache.size)}\n> **Пользователей:** ${format(bot.users.cache.size)}\n> **Каналов:** ${format(bot.channels.cache.size)}\n> **Эмодзи:** ${format(bot.emojis.cache.size)}\n> **Комманд:** ${format(bot.commands.size)}`, true)
		.setFooter(bot.guilds.cache.get('723256155815805028').name, bot.guilds.cache.get('723256155815805028').iconURL());
		message.channel.send(embed);
	}
}