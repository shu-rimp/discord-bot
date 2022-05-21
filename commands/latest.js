const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require('node:timers/promises').setTimeout;

const gn = require("../functions/getNews.js");
const gsm = require("../functions/getSelectMenus.js");
const ge = require("../functions/getEmbed.js");
const gb = require("../functions/getButton.js");

module.exports = {
    // command area
    data: new SlashCommandBuilder()
        .setName("뉴스검색")
        .setDescription("새우가 뉴스를 검색해요")
        .addStringOption((option) => option.setName("키워드").setDescription("키워드를 입력하새우").setRequired(true)),
        
    // execute 
    async execute(interaction) {
        
        const keyword = interaction.options.getString("키워드");
        
        let data = await gn.getNews(keyword); // api call
        
        // error(no result matches) handling area
        if (data.total < 100) {
            const embed = await ge.getErrorEmbed(keyword);
            
            await interaction.reply({ embeds: [embed] });
            await wait(4000)
            await interaction.deleteReply();
            
            return;
        } // if

        // initialize numbers
        let selectedValue = 0;
        let pageNum = 0;
        
        let row = await gsm.getSelectMenus(data, 0);    // generate menus
        const row2 = await gb.getButton();              // generate buttons
        
        // default embed area
        let embed = await ge.getEmbed(data, selectedValue, pageNum);
        
        await interaction.deferReply();
        const message = await interaction.editReply({
            content: ":mag: `" + keyword + "` (으)로 검색한 뉴스입니다.",
            embeds: [embed],
            components: [row, row2],
        });

        // set filter
        const filter = (i) => {
            if ( (i.customId === "select" || "previousPage" || "nextPage" || "quit") 
                && (i.user.id === interaction.user.id) ) {
                return true;
            }
        };
        
        // set collector
        const collector = await message.createMessageComponentCollector({
            filter,
            time: 300 * 1000,
            maxProcessed: 1
        });
        
        await collector.on("collect", async (interaction) => {
            
            if ((await interaction.customId) === "nextPage") {
                if(pageNum >= 90) {
                    await interaction.reply("마지막 페이지 입니다.");
                    await wait(2000);
                    await interaction.deleteReply();

                    pageNum = 90;

                    return;
                }

                pageNum += 10;
                selectedValue = pageNum;

                // console.log('pageNum = ', pageNum);
                // console.log('selectedValue = ', selectedValue);
            } // nextPage

            if ((await interaction.customId) === "previousPage") {
                if(pageNum <= 0) {
                    await interaction.reply("첫번째 페이지 입니다.");
                    await wait(2000);
                    await interaction.deleteReply();

                    pageNum = 0;

                    return;
                }

                pageNum -= 10;
                selectedValue = pageNum;

                // console.log('pageNum = ', pageNum);
                // console.log('selectedValue = ', selectedValue);
            } // previousPage

            if ((await interaction.customId) === "select") {
                selectedValue = parseInt(interaction.values[0]) + pageNum;
                // console.log(selectedValue);
            } // select

            if (await interaction.customId === 'quit') {
                embed = await ge.getQuitEmbed();
                await interaction.deferUpdate();
                await interaction.editReply({ 
                    content: ' ',
                    embeds: [embed], 
                    components: [] });
                await wait(2000);
                await interaction.deleteReply();
                
                await collector.stop();
                
                return;
            } // quit

            // get new embed&row
            embed = await ge.getEmbed(data, selectedValue, pageNum);
            row = await gsm.getSelectMenus(data, pageNum);
            
            // update message area
            try {
                await interaction.deferUpdate();
                await interaction.editReply({
                    content: ":mag: `" + keyword + "` (으)로 검색한 뉴스입니다.",
                    embeds: [embed],
                    components: [row, row2],
                });
                
            } catch(error) {
                console.log(error);
                await interaction.channel.send('상호작용 실패. 검색 종료 후 다시 시도해주세요');
                
                await collector.stop();
            } // try-catch

        }); // end of collector
            
    }, // end of execute
}; // module.exports
