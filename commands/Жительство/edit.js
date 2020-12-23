const Discord = require('discord.js');
module.exports = {
	name: "edit",
	category: "",
	aliases: ["e", "ed", "изменить", "отредактировать", "редактировать"],
	description: "Команда с больши кол-вом функций.",
	availability: false,
	run: async (message, args, bot) => {
        if(!bot.cities[args.slice(1, 9999).join(" ")]){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Город и подкоманда не найдены\n\n> **Вот список доступных подкоманд для этой команды:**\n\`.изменить описание [город]\` - Изменить описание города\n\`.изменить эмодзи [город]\` - Изменить эмодзи города\n\`.изменить картинку [город]\` - Изменить картинку города\n\`.изменить цвет [город]\` - Изменть цвет обводки сообщения\n\`.изменить мера [город]\` - Изменть мера города")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }
        if(args[0] == "описание" && bot.cities[args.slice(1, 9999).join(" ")] && bot.cities[args.slice(1, 9999).join(" ")].mayor == message.author.id){
            let e = new Discord.MessageEmbed()
            .setTitle(`**Изменение описания**`)
            .setColor('#f0f0f0')
            .setTimestamp()
            .setDescription(`Напишите сообщение, которое будет содержать описание вашего города`)
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(e);
            const filter = m => m.author.id == message.author.id;
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
            collector.on('collect', m => {
                bot.cities[args.slice(1, 9999).join(" ")].description = m.content;
                let em = new Discord.MessageEmbed()
                .setTitle(`**Изменение описания**`)
                .setColor('#f0f0f0')
                .setTimestamp()
                .setDescription(`Описание вашего города изменилось!\n\n> **Текущее описание города:**\n${bot.cities[args.slice(1, 9999).join(" ")].description}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                m.channel.send(em);
            });
        }else if(args[0] == "эмодзи" && bot.cities[args.slice(1, 9999).join(" ")] && bot.cities[args.slice(1, 9999).join(" ")].mayor == message.author.id){
            let e = new Discord.MessageEmbed()
            .setTitle(`**Изменение эмодзи**`)
            .setColor('#f0f0f0')
            .setTimestamp()
            .setDescription(`Напишите сообщение, которое будет содержать эмодзи`)
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(e);
            const filter = m => m.author.id == message.author.id;
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
            collector.on('collect', m => {
                bot.cities[args.slice(1, 9999).join(" ")].emoji = m.content;
                let em = new Discord.MessageEmbed()
                .setTitle(`**Изменение эмодзи**`)
                .setColor('#f0f0f0')
                .setTimestamp()
                .setDescription(`Эмодзи вашего города изменилось!\n\n> **Текущее эмодзи города:**\n${bot.cities[args.slice(1, 9999).join(" ")].emoji}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                m.channel.send(em);
            });
        }else if(args[0] == "картинку" && bot.cities[args.slice(1, 9999).join(" ")] && bot.cities[args.slice(1, 9999).join(" ")].mayor == message.author.id){
            let e = new Discord.MessageEmbed()
            .setTitle(`**Изменение картинки**`)
            .setColor('#f0f0f0')
            .setTimestamp()
            .setDescription(`Напишите сообщение, которое будет содержать ссылку URL картинки как флаг вашего города.\n**Важно!** __Ссылка должна быть прямой на картинку!!!__\n> **Пример:**\n> \`https://images-ext-2.discordapp.net/external/qQrv4L3dEHHuvOqHEx8VfU6zfZ1iVDbnX0f61HX50cE/%3Fwidth%3D230%26height%3D230/https/media.discordapp.net/attachments/694876445922689115/756233042808406086/search--v2.png?width=207&height=207\``)
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(e);
            const filter = m => m.author.id == message.author.id && m.content.startsWith(`https` || `http`);
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
            collector.on('collect', m => {
                bot.cities[args.slice(1, 9999).join(" ")].image = m.content;
                let em = new Discord.MessageEmbed()
                .setTitle(`**Изменение картинки**`)
                .setColor('#f0f0f0')
                .setTimestamp()
                .setImage(bot.cities[args.slice(1, 9999).join(" ")].image)
                .setDescription(`Картинка вашего города изменилась!\n\n\`Текущая картинка ниже\``)
                .setFooter(message.guild.name, message.guild.iconURL())
                m.channel.send(em);
            });
        }else if(args[0] == "цвет" && bot.cities[args.slice(1, 9999).join(" ")] && bot.cities[args.slice(1, 9999).join(" ")].mayor == message.author.id){
            let e = new Discord.MessageEmbed()
            .setTitle(`**Изменение цвета**`)
            .setColor('#f0f0f0')
            .setTimestamp()
            .setDescription(`Напишите сообщение, которое будет содержать HEX цвет вашего города\n\nВоспользуйтесь [этим](https://www.google.com/search?q=color+picker&oq=color&aqs=chrome.0.69i59j69i57j0l3j69i60l3.1975j1j9&sourceid=chrome&ie=UTF-8)`)
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(e);
            const filter = m => m.author.id == message.author.id && m.content.startsWith(`#`);
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
            collector.on('collect', m => {
                bot.cities[args.slice(1, 9999).join(" ")].color = m.content;
                let em = new Discord.MessageEmbed()
                .setTitle(`**Изменение цвета**`)
                .setColor(bot.cities[args.slice(1, 9999).join(" ")].color)
                .setTimestamp()
                .setDescription(`Цвет вашего города изменился!\n\n\`Текущий цвет вашего города используется для этого сообщения\``)
                .setFooter(message.guild.name, message.guild.iconURL())
                m.channel.send(em);
            });
        }else if(args[0] == "мера" && bot.cities[args.slice(1, 9999).join(" ")] && bot.cities[args.slice(1, 9999).join(" ")].mayor == message.author.id){
            let e = new Discord.MessageEmbed()
            .setTitle(`**Изменение мера**`)
            .setColor('#f0f0f0')
            .setTimestamp()
            .setDescription(`Напишите сообщение, которое будет содержать **__ID МЕРА__**`)
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(e);
            const filter = m => m.author.id == message.author.id && Number(m.content);
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
            collector.on('collect', m => {
                bot.cities[args.slice(1, 9999).join(" ")].mayor = m.content;
                bot.cities[args.slice(1, 1000).join(" ")].citizens[message.author.id] = {
                    role: "Житель"
                };
                let em = new Discord.MessageEmbed()
                .setTitle(`**Изменение мера**`)
                .setColor('#f0f0f0')
                .setTimestamp()
                .setDescription(`Мер вашего города изменился!\n\n> **Мер:** <@${bot.cities[args.slice(1, 9999).join(" ")].mayor}>`)
                .setFooter(message.guild.name, message.guild.iconURL())
                m.channel.send(em);
            });
        }else if(args[0] == "координаты" && bot.cities[args.slice(1, 9999).join(" ")] && bot.cities[args.slice(1, 9999).join(" ")].mayor == message.author.id){
            let e = new Discord.MessageEmbed()
            .setTitle(`**Изменение расположения**`)
            .setColor('#f0f0f0')
            .setTimestamp()
            .setDescription(`Напишите сообщение, которое будет выглядить так:\n\`\`\`Нижний мир:\nX Y Z\n------------------\nВерхний мир:\nX Y Z\`\`\`\n> **Пример сообщения:**\n\`\`\`1039 64 7042 1234 40 1345\`\`\``)
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(e);
            const filter = m => m.author.id == message.author.id && Number(m.content);
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
            collector.on('collect', m => {
                bot.cities[args.slice(1, 9999).join(" ")].mayor = m.content;
                bot.cities[args.slice(1, 1000).join(" ")].citizens[message.author.id] = {
                    role: "Житель"
                };
                let em = new Discord.MessageEmbed()
                .setTitle(`**Изменение мера**`)
                .setColor('#f0f0f0')
                .setTimestamp()
                .setDescription(`Мер вашего города изменился!\n\n> **Мер:** <@${bot.cities[args.slice(1, 9999).join(" ")].mayor}>`)
                .setFooter(message.guild.name, message.guild.iconURL())
                m.channel.send(em);
            });
        }else if(!args){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Команда не найдена\n\n> **Вот список доступных параметров для этой команды:**\n\`.изменить описание [город]\` - Изменить описание города\n\`.изменить эмодзи [город]\` - Изменить эмодзи города\n\`.изменить картинку [город]\` - Изменить картинку города\n\`.изменить цвет [город]\` - Изменть цвет обводки сообщения\n\`.изменить мера [город]\` - Изменть мера города\n\`.изменить координаты [город]\` - Изменть расположение города")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }else if(bot.cities[args.slice(1, 9999).join(" ")] || bot.cities[args.slice(1, 9999).join(" ")].mayor !== message.author.id){
            const embed = new Discord.MessageEmbed()
            .setColor('#ff4f4f')
            .setTitle('🚫 **Внимание!**')
            .setTimestamp()
            .setDescription("Вы не являетесь мером города")
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed);
            return;
        }
	}
}