const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('도와주새우')
		.setDescription('사용방법을 알려주는 새우'),
	async execute(interaction) {
		const ge = require("../functions/getEmbed.js");

        const embed = await ge.getHelpEmbed();
        await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};