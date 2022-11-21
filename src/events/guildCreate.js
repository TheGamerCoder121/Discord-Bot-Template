/* eslint-disable no-unused-vars */
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../../config.json');
const fs = require('node:fs');
const chalk = require('chalk');

module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		// eslint-disable-next-line quotes
		const { id } = guild;
		const commands = [];
		// Grab all the command files from the commands directory you created earlier
		const commandFiles = fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.js'));

		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			commands.push(command.data.toJSON());
		}

		// Construct and prepare an instance of the REST module
		const rest = new REST({ version: '10' }).setToken(token);

		// and deploy your commands!

		try {
			console.log(`\n${chalk.blue.dim('[INFO]')} Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, id),
				{ body: commands },
			);

			console.log(`${chalk.blue('[INFO]')} ${chalk.green('Successfully')} reloaded ${data.length} application (/) commands.`);
		}
		catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}

	},
};
