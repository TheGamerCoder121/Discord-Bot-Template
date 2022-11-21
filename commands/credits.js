/* eslint-disable no-unused-vars */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Hmm I wonder who make this'),
	async execute(interaction) {
		// const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		// interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
		const main = new EmbedBuilder()
			.setColor(0x004892)
			.setDescription('[@Mr.Gamer](https://mrgamer.xyz) - Actually coding\n@StackOverflow - Keeping me sane\n\nTo purchase, head over to my [store!](https://mrgamer.xyz/store)')
			.setFooter({ text: 'Credits - Made with ❤️ by Mr.Gamer' })
			.setTitle('Bot Credits');
		await interaction.reply({ embeds: [main] });
	},
};