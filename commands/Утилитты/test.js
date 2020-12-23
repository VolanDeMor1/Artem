const Discord = module.require('discord.js');
const fs = require('fs');
var table = require('text-table');

module.exports = {
	name: 'test',
	category: "",
	description: 'Неважно.',
    aliases: ["тест"],
	availability: false,
	run: async (message, args, bot) => {
        var t = table(
            [
            [ 'beep', '1024', 'xyz' ],
            [ 'boop', '3388450', 'tuv' ],
            [ 'foo', '10106', 'qrstuv' ],
            [ 'bar', '45', 'lmno' ]
        ], 
        { 
            align: [ 'l', 'c', 'l' ] 
        });
			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription(await t)
				.setFooter(message.guild.name, message.guild.iconURL());

			message.channel.send(embed);
	}
};
