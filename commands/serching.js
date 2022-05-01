const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('검색좀해줘')
		.setDescription('검색을 해줄까요'),
	async execute(interaction) {
		await interaction.reply('그렇겐 못합니다.');
	},
};