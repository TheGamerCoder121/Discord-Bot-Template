/* eslint-disable max-statements-per-line */
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const Util = require('./Util.js');
const config = require('../../config');

module.exports = class MrGamerClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone',
			intents: [GatewayIntentBits.Guilds],
		});
		this.validate(options);

		this.commands = new Collection();

		this.events = new Collection();

		this.utils = new Util(this);

		this.config = config;

	}
	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		super.login(token);
	}

};