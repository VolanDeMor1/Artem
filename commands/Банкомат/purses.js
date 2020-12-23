const Discord = require('discord.js');
module.exports = {
	name: "purses",
	aliases: ["prs", "казны"],
	description: "Отображает все созданные казны.",
	category: "",
	availability: true,
	run: async (message, args, bot) => {
        let str = "";
        let acho = 1;
        for(let a in bot.purses){
            str += `**${acho++}.** \"${a}\" - **${bot.purses[a].balance}** <:ap:772823205420204062>\n`;
        }
		let embed = new Discord.MessageEmbed()
            .setTitle(`**Казны**`)
            .setColor("RANDOM")
            .setDescription(str)
        message.channel.send(embed);
	}
}