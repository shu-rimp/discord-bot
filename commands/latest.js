const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    // command area
    data: new SlashCommandBuilder()
        .setName("뉴스검색")
        .setDescription("뉴스를 검색하는 새우.")
        .addStringOption((option) => option.setName("키워드").setDescription("키워드를 입력하새우.").setRequired(true)),

    async execute(interaction) {
        const gn = require("../functions/getNews.js");
        const gsm = require("../functions/getSelectMenus.js");
        const ge = require("../functions/getEmbed.js");
        const gb = require("../functions/getButton.js");
        
        
        let selectedValue = 0;
        let pageNum = 0;
        
        const keyword = interaction.options.getString("키워드");
        // let startNum = 1;
        
        
        console.log("토큰 아이디 : ", interaction.token);
        
        let data = await gn.getNews(keyword); // api call
        
        if (data.total >= 100) {
            
            let row = await gsm.getSelectMenus(data, 0);    // 메뉴생성
            const row2 = await gb.getButton();              // 버튼생성
            
            // default embed area
            let embed = await ge.getEmbed(data, selectedValue, pageNum);
            await interaction.reply({
                content: ":mag: `" + keyword + "` 로 검색한 결과입니다.",
                embeds: [embed],
                components: [row, row2],
                ephemeral: true
            });

            // 메뉴, 버튼 클릭 하면 true 반환
            const filter = (interaction) => {
                if (interaction.customId === "select" || "previousPage" || "nextPage" || "quit") {
                    return true;
                }
            };
            
            const collector = await interaction.channel.createMessageComponentCollector({
                filter,
                time: 60 * 1000,
            });
            
            await collector.on("collect", async (interaction) => {
                
                if ((await interaction.customId) === "nextPage") {
                    if(pageNum >= 90) {
                        await interaction.reply( { content : "마지막 페이지 입니다.", ephemeral: true });
                        // await wait(2000);
                        // await interaction.deleteReply();

                        pageNum = 90;

                        return;
                    }

                    pageNum += 10;
                    selectedValue = pageNum;

                    console.log('pageNum = ', pageNum);
                    console.log('selectedValue = ', selectedValue);
                }

                if ((await interaction.customId) === "previousPage") {
                    if(pageNum <= 0) {
                        await interaction.reply( { content : "첫번째 페이지 입니다.", ephemeral: true });
                        // await wait(2000);
                        // await interaction.deleteReply();

                        pageNum = 0;
                        return;
                    }

                    pageNum -= 10;
                    selectedValue = pageNum;

                    console.log('pageNum = ', pageNum);
                    console.log('selectedValue = ', selectedValue);
                }

                if ((await interaction.customId) === "select") {
                    selectedValue = parseInt(interaction.values[0]) + pageNum;
                    console.log(selectedValue);

                }

                try {
                    if (await interaction.customId === 'quit') {
                        embed = await ge.getQuitEmbed();
                        await interaction.update({ 
                            content: ' ',
                            embeds: [embed], 
                            components: [] });
                        await wait(2000);
                        // await interaction.deleteReply();
                        
                        collector.stop();
                        
                        return;
                    }
                    
                } catch(error) {
                    console.error(error)
                    
                    collector.stop();
                }

                embed = await ge.getEmbed(data, selectedValue, pageNum);
                row = await gsm.getSelectMenus(data, pageNum);
                
                try {
                    // await interaction.deferUpdate();
                    await interaction.update({
                        content: ":mag: `" + keyword + "` 로 검색한 결과입니다.",
                        embeds: [embed],
                        components: [row, row2],
                    });
                    
                } catch(error) {

                    await interaction.channel.send('상호작용 실패. 다시 시도해주세요')
                        .then(msg => {
                            wait(2000);
                            msg.delete({ timeout: 200000 /*time unitl delete in milliseconds*/});
                        });
                    
                    collector.stop();
                }
                
            }); // end of collector

        } else {
            // error(no result matches) handling area
            const embed = await ge.getErrorEmbed(keyword);

            await interaction.reply({ embeds: [embed] });
            await wait(4000)
            await interaction.deleteReply();
        } // if-else


    }, // end of execute
}; // module.exports
