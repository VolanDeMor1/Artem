const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
	category: "",
  aliases: ["q", "очередь"],
  description: "Просмотр очереди треков.",
  availability: true,
  run: (message, args) => {
    const player = message.client.manager.players.get(message.guild.id);
    if (!player){
			let embed = new MessageEmbed()
				.setTitle("<:nope:751695799561486377> **Внимание!**")
				.setColor('#ff4f4f')
				.setDescription(`В очереди пусто 😔`)
				.setTimestamp()
				.setFooter(message.guild.name, message.guild.iconURL());
			return message.channel.send(embed);
		}

    const queue = player.queue;
    const embed = new MessageEmbed().setAuthor(`Очередь треков для ${message.guild.name}`, message.guild.iconURL());

    // change for the amount of tracks per page
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.addField("**Сейчас играет:**", `[${queue.current.title.replace("**", "")}](${queue.current.uri})`);

    if (!tracks.length) embed.setDescription(`Нет треков в ${page > 1 ? `страница ${page}` : "очереди"}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title.replace("**", "")}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);

    embed.setColor("RANDOM")
    embed.setTimestamp()
    embed.setFooter(`Страница ${page > maxPages ? maxPages : page}/${maxPages}`);

    return message.reply(embed);
  }
}