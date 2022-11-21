/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listing')
		.setDescription('Create a listing')
		.addStringOption((option) =>
			option
				.setName('name')
				.setDescription('Name of item to list')
				.setRequired(true),
		)
		.addIntegerOption((option) =>
			option
				.setName('price')
				.setDescription('Price of product (Don\'t include the $)')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('embedcolor')
				.setDescription('Name of item to list')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('itemdescription')
				.setDescription('General description of item being listed')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('itemincludes')
				.setDescription(
					'What features does this product include (Seperate eatch item with - )',
				)
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('productshowcase')
				.setDescription('Other pictures/videos of the product')
				.setRequired(true),
		)
		.addAttachmentOption((option) =>
			option
				.setName('featuredimage')
				.setDescription('Featured image to be shown in the embed')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName('purchaselocation')
				.setDescription('Where can this item be purchased?')
				.setRequired(true),
		),

	async execute(interaction) {
		const name = interaction.options.getString('name');
		const amount = interaction.options.getInteger('price');
		const itemIncludes = interaction.options.getString('itemincludes');
		const itemDescription = interaction.options.getString('itemdescription');
		const featuredImage = interaction.options.getAttachment('featuredimage');
		const productshowcase = interaction.options.getString('productshowcase');
		const color = interaction.options.getString('embedcolor').replace('#', '0x');
		const purchaseLocation = interaction.options.getString('purchaselocation');

		const guild = interaction.guild;

		const main = new EmbedBuilder()
			.setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
			.setColor(color)
			.setTitle(name)
			.setTimestamp()
			.addFields(
				{ name: 'Price', value: `$${String(amount)} USD` },
				{ name: 'Product Description', value: itemDescription.replace(/\\n/gi, '\n• ') },
				{ name: 'Items Included', value: itemIncludes.replace(/\\n/gi, '\n• ') },
				{ name: 'Misc Images', value: productshowcase },
				{ name: 'Where to purchase', value: purchaseLocation },
			)
			.setFooter({
				text: guild.name,
				iconURL:
            guild.iconURL({ dynamic: true }),
			})
			.setImage(featuredImage.url);

		await interaction.reply({ embeds: [main] });
		await interaction.followUp({
			content: 'Successfuly posted listing!',
			ephemeral: true,
		});
	},
};
