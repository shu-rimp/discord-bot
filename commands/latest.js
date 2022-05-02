const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('최신뉴스')
        .setDescription('최신뉴스를 제공하는 새우.')
        .addStringOption(option =>
            option.setName('카테고리')
                .setDescription('지정한 카테고리의 최신뉴스를 제공합니다.')
                .setRequired(true)
                .addChoice('정치', '정치')
                .addChoice('사회', '사회')),

    async execute(interaction) {
        const { Naver_Client_Id, Naver_Client_Secret } = require('../config.json');
        const rt = require('../functions/removeTags.js');
        // const input = interaction.option.getString('정치');
        // console.log(input);

        await interaction.deferReply();

        let header = new fetch.Headers({
            "X-Naver-Client-Id": Naver_Client_Id,
            "X-Naver-Client-Secret": Naver_Client_Secret,
        });

        let response = await fetch("https://openapi.naver.com/v1/search/news.json?query=주식&display=1&start=1", { headers: header });
        let data = await response.json();

        console.log(data);
        console.log(data.items[0].title);

        const embed = new MessageEmbed()
            .setColor("#2DB400")
            .setTitle(rt.removeTags(data.items[0].title))
            .setURL(data.items[0].link)
            .addFields(
				{ name: "기사제목", value: rt.removeTags(data.items[0].title) }, 
				{ name: "요약", value: rt.removeTags(data.items[0].description) }
			);

        interaction.editReply({ embeds: [embed] });
    },
};
