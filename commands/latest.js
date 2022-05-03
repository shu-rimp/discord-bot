const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("뉴스검색")
        .setDescription("뉴스를 검색하는 새우.")
        .addStringOption((option) => option.setName("키워드").setDescription("키워드를 입력하새우.").setRequired(true)),

    async execute(interaction) {
        // const { Naver_Client_Id, Naver_Client_Secret } = require('../config.json');
        const rt = require("../functions/removeTags.js");
        const gn = require("../functions/getNews.js");

        const keyword = interaction.options.getString("키워드");

        await interaction.deferReply();

        let data = await gn.getNews(keyword);

        if (data.total != 0) {
            const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("뉴스기사를 선택해주세요.")
                    .addOptions([
                        {
                            label: rt.removeTags(data.items[0].title),
                            description: "This is a description",
                            value: "0",
                        },
                        {
                            label: rt.removeTags(data.items[1].title),
                            description: "This is also a description",
                            value: "1",
                        },
                        {
                            label: rt.removeTags(data.items[2].title),
                            description: "This is also a description",
                            value: "2",
                        },
                        {
                            label: rt.removeTags(data.items[3].title),
                            description: "This is also a description",
                            value: "3",
                        },
                        {
                            label: rt.removeTags(data.items[4].title),
                            description: "This is also a description",
                            value: "4",
                        },
                        {
                            label: rt.removeTags(data.items[5].title),
                            description: "This is also a description",
                            value: "5",
                        },
                        {
                            label: rt.removeTags(data.items[6].title),
                            description: "This is also a description",
                            value: "6",
                        },
                        {
                            label: rt.removeTags(data.items[7].title),
                            description: "This is also a description",
                            value: "7",
                        },
                        {
                            label: rt.removeTags(data.items[8].title),
                            description: "This is also a description",
                            value: "8",
                        },
                        {
                            label: rt.removeTags(data.items[9].title),
                            description: "This is also a description",
                            value: "9",
                        },
                    ])
            );
        
            const filter = (interaction) => {
                return interaction.customId === 'select';
            }

            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                time : 60 * 1000, 
            });

            collector.on("collect", async (interaction) => {
                
                if(await interaction.customId === 'select') {
                    const selectedValue = parseInt(interaction.values[0]);
                    console.log(selectedValue);

                    embed = new MessageEmbed()
                        .setColor("#2DB400")
                        .setTitle(rt.removeTags(data.items[selectedValue].title))
                        .setURL(data.items[selectedValue].link)
                        // .setAuthor({ name : "`" + keyword + "` 로 검색한 결과입니다."})
                        .addFields({ name: "ㅤ", value: rt.removeTags(data.items[selectedValue].description) })
                        .setFooter({ text: "Published :: " + data.items[selectedValue].pubDate });

                    await interaction.update({ content: ":mag: `" + keyword + "` 로 검색한 결과입니다.", embeds: [embed], components: [row] });
                }
            })

            let embed = new MessageEmbed()
                .setColor("#2DB400")
                .setTitle(rt.removeTags(data.items[0].title))
                .setURL(data.items[0].link)
                // .setAuthor({ name : "`" + keyword + "` 로 검색한 결과입니다."})
                .addFields({ name: "ㅤ", value: rt.removeTags(data.items[0].description) })
                .setFooter({ text: "Published :: " + data.items[0].pubDate });
            
            await interaction.editReply({ content: ":mag: `" + keyword + "` 로 검색한 결과입니다.", embeds: [embed], components: [row] });

            
        } else {
            const embed = new MessageEmbed()
                .setColor("#EF5350")
                .setTitle(":warning: 이런! 새우가 길을 잃었네요...")
                .setThumbnail(
                    "https://w.namu.la/s/4c27296bd851d7b269203ec98248c5d5a4d7d1bc430c3d2ef225d29d69979d47efb449009f6eeecd4789a192dd089660f0be23c680024acade9eba25341e3545960dc249d9e9c7754e7203a4301ec77d"
                )
                .addFields({ name: "검색결과를 찾을 수 없습니다.", value: "입력한 키워드 : `" + keyword + "`" })
                .setFooter({ text: "올바른 키워드를 입력했나요?", iconURL: "https://images.emojiterra.com/twitter/v13.1/512px/1f50d.png" });

            await interaction.editReply({ embeds: [embed] });
        }
    },
};
