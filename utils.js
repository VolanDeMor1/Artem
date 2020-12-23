const fs = require('fs');
const { readdirSync } = require("fs");
const Discord = require('discord.js');

module.exports = class Utils {

    constructor(bot){
        this.bot = bot;
    }

    /**
     * Чекает права мембера
     * @param {Казна} purse 
     * @param {Айди юзера} member 
     * @param {true если add || false если remove} addOrRem 
     */
    checkPermissions(purse, member, addOrRem){
        console.log(this.bot.purses[purse].permissions);
        switch(this.bot.purses[purse].permissions){
            case "PRIVATE":
                let find = false;
                this.bot.purses[purse].available.forEach(mmm => {
                    if(mmm == member){
                        find = true;
                        return true;
                    }
                });
                if(!find) return false;
            case "SOMEBODY":
                return true;
            case "ONLYADD":
                if(addOrRem) return true;
                if(!addOrRem) this.checkListOfPurse(purse, member);
                break;
            case "ONLYREMOVE":
                if(addOrRem) this.checkListOfPurse(purse, member);
                if(!addOrRem) return true;
                break;
            default:
                return false;
        }
    }

    checkBalance(msg, arg1, arg2){
        if(arg1 < arg2){
            let embed = new Discord.MessageEmbed()
            .setTitle(`<:nope:751695799561486377> **Ошибка!**`)
            .setColor('#ff0000')
            .setDescription("Вы не можете указать сумму больше количества ар у вас на счету")
            msg.edit(embed);
            return false;
        }else if(arg1 >= arg2){
            return true;
        }
    }

    loadCommands(){
        const papks = fs.readdirSync("./commands/").filter(papka => !papka.endsWith(".js"));
        console.log(papks);
        for(const papka of papks){
          const files = readdirSync(`./commands/${papka}`).filter(file => file.endsWith(".js"));
          for (const file of files) {
            console.log(papka + "/" + file)
            const command = require(`./commands/${papka}/${file}`);
            this.bot.commands.set(command.name, command);
            this.bot.commands.get(command.name).category = papka;
            if (command.aliases.length) {
              for (const alias of command.aliases) {
                this.bot.aliases.set(alias, command.name);
              }
            }
          }
        }
    }

}