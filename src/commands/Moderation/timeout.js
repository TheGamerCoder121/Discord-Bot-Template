const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member from this current discord')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('The member to kick')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('Reason for kick'),
		)
		.addBooleanOption((option) =>
			option
				.setName('ephemeral')
				.setDescription('Should this message be visable to everyone')
				.setRequired(true),
		),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
		const ephemeral = interaction.options.getBoolean('ephemeral');

		const kick = new EmbedBuilder()
			.setTitle('User Kicked!')
			.setDescription(`${member.user.username}`);

		return interaction.reply({
			content: `You wanted to kick: ${member.user.username}`,
			ephemeral: true,
		});
	},
};
