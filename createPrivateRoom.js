
module.exports = function(oM, nM, bot) {
  if(nM.guild.id !== '768484130308227132') return;
  if (nM.channelID) {
    if (nM.channelID == '768889564751200266') {
      nM.guild.channels.create(`「🔊」Приват ${nM.guild.members.cache.get(nM.id).displayName}`, {
          type: "VOICE",
          parent: "768484130308227134",
          permissionOverwrites: [
            {
              id: nM.guild.id,
              deny: ["ADMINISTRATOR"],
              allow: ["CONNECT", "SPEAK", "VIEW_CHANNEL"]
            },
            {
              id: nM.id,
              allow: ["KICK_MEMBERS", "MANAGE_CHANNELS"]
            },
            {
              id: '768890525277093938',
              deny: ["CONNECT", "SPEAK"]
            },
            {
              id: '768890525277093938',
              allow: ["CONNECT", "SPEAK", "VIEW_CHANNEL", "MANAGE_CHANNELS"]
            }
          ]
        })
        .then(room => {
          nM.setChannel(room.id);
        });
    }
  }
};