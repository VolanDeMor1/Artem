module.exports = class Command {

	constructor(bot, name, options = {}) {
		this.bot = bot;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'Описание не добавлено.';
        this.category = options.category || 'Разное';
        this.availability = options.availability || false;
	}

};
