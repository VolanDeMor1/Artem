const Discord = module.require('discord.js');
const request = require('request');

module.exports = {
	name: 'skin',
	category: "",
	description: 'Просмотр скина игрока Minecraft.',
    aliases: ["sk", "скин"],
	availability: true,
	run: async (message, args, bot) => {
        let searchuuid =  `https://playerdb.co/api/player/minecraft/${args[0] || message.member.displayName}`;
        request(searchuuid, function(err, response, body){
            if(!err){
                let suuid = JSON.parse(body);
                if(!suuid.data || !suuid.data.player || !suuid.data.player.id){
                    let embed = new Discord.MessageEmbed()
                        .setTitle("<:nope:751695799561486377> **Внимание!**")
                        .setColor('#ff4f4f')
                        .setDescription(`Игрок не найден`)
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL())
                    return message.channel.send(embed);
                }
                let embed = new Discord.MessageEmbed()
                .setAuthor(`Скин ${suuid.data.player.username}`, `https://visage.surgeplay.com/face/${suuid.data.player.id}`)
                .setColor('#2f3136')
                .setDescription(`[Скачать скин](https://visage.surgeplay.com/skin/${suuid.data.player.id})`)
                .setImage(`https://visage.surgeplay.com/full/${suuid.data.player.id}`)
                message.channel.send(embed);
            }
        });
	}
};
