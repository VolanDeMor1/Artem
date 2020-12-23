const { Client, Collection } = require('discord.js');
const Util = require('../utils.js');

module.exports = class AivaClient extends Client {

    constructor(options = {}){
        super({
            disableMentions: 'everyone'
        });
        this.validate(options);

        this.commands = new Collection();

        this.aliases = new Collection();
        
        this.purses = require('../purses.json');

        this.profiles = require('../users.json');

        this.cities = require('../cities.json');

        this.utils = new Util(this);

    }

	validate(options) {
		this.token = options.token;
		this.prefix = options.prefix;
	}

    start(token = this.token){
        this.utils.loadCommands();
        super.login(token);
    }

}