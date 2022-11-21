const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
// const Event = require('./Event.js');
const fs = require('node:fs');

module.exports = class Util {

	constructor(client) {
		this.client = client;
	}


	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}

	async loadCommands() {
		const commandsPath = path.join(__dirname, '/../commands');
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			this.client.commands.set(command.data.name, command);
		}
	}
	async loadEvents() {
		const eventsPath = path.join(__dirname, '/../events');
		const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
		
		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file);
			const event = require(filePath);
			if (event.once) {
				this.client.once(event.name, (...args) => event.execute(...args));
			}
			else {
				this.client.on(event.name, (...args) => event.execute(...args));
			}
		}
	}

};
