const path = require('path');
// const Event = require('./Event.js');
const fs = require('node:fs');
const glob = require('glob');
const { eventNames } = require('process');

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
		const commands = this.client.commands;
		const commandsPath = path.join(__dirname, '/../commands/');
		glob(`${commandsPath}/**/*.js`, function(er, files) {
			for (const commandFile of files) {
				const command = require(commandFile);
				commands.set(command.data.name, command);
			}
		});
	}
	async loadEvents() {
		const boton = this.client.on;
		const eventsPath = path.join(__dirname, '/../events');
		glob(`${eventsPath}/**/*.js`, function(er, files) {
			for (const file of files) {
				const event = require(file);
				if (event.once) {
					this.client.once(event.name, (...args) => event.execute(...args));
				}
				else {
					boton(event.name, (...args) => event.execute(...args));
				}
			}
		});
	}

};
