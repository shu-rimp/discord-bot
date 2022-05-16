const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// command area
	data: new SlashCommandBuilder()
		.setName('도와주새우')
		.setDescription('새우가 사용방법을 알려줘요'),

	// execute
	async execute(interaction) {
		const ge = require("../functions/getEmbed.js");

        const embed = await ge.getHelpEmbed();
        await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};