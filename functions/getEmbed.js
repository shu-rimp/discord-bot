module.exports = {

    getEmbed: async function (data, selectedValue, pageNum) {
        const { MessageEmbed } = require("discord.js");
        const rt = require("./removeTags.js");

        pageNum = parseInt(pageNum / 10) + 1;
        currentPage = (selectedValue % 10) + 1;
        data.items[selectedValue].pubDate = data.items[selectedValue].pubDate.replace("+0900", "");

        return new MessageEmbed()
            .setColor("#2DB400")
            .setTitle(rt.removeTags(data.items[selectedValue].title))
            .setURL(data.items[selectedValue].link)
            .setThumbnail("https://cdn.discordapp.com/attachments/973929274744643595/973929352402190356/-001_5.png")
            .addFields({
                name: "ㅤ",
                value: rt.removeTags(data.items[selectedValue].description),
            })
            .setFooter({
                text: "Published :: " + data.items[selectedValue].pubDate + " (" + currentPage + " of " + pageNum + " page)",
            });
    }, // getEmbed

    getErrorEmbed: async function (keyword) {
        const { MessageEmbed } = require("discord.js");

        return new MessageEmbed()
            .setColor("#EF5350")
            .setTitle(":warning: 이런! 새우가 길을 잃었네요...")
            .setThumbnail("https://cdn.discordapp.com/attachments/973929274744643595/975774853246378065/7468696e6b696e672d666163655f31663931342e706e67.png")
            .addFields({
                name: "검색결과를 찾을 수 없습니다.",
                value: "입력한 키워드 : `" + keyword + "`",
            })
            .setFooter({
                text: "[Tip] 올바른 키워드를 입력했나요?",
                iconURL: "https://cdn.discordapp.com/attachments/973929274744643595/975775146650525726/1f50d.png",
            });
    }, // getErrorEmbed

    getHelpEmbed: async function () {
        const { MessageEmbed } = require("discord.js");

        return new MessageEmbed()
            .setColor("#2DB400")
            .setTitle("새우 이용안내")
            .addFields({
                name: "ㅤ",
                value: "`/뉴스검색 [키워드]`\n입력한 키워드로 뉴스를 검색합니다.\n키워드가 포함된 100개의 최신 뉴스를 보여줍니다.\n메뉴를 통해 원하는 기사를 선택하세요.\n클릭하면 뉴스 전문으로 이동합니다.",
            })
            .addFields({
                name: "ㅤ",
                value: "`< (이전페이지)`  `> (다음페이지)`\n버튼을 눌러 페이지를 넘길 수 있습니다."
            })
            .addFields({
                name: "ㅤ",
                value: "`X (검색종료)`\n검색창을 닫습니다. 자동으로 메시지의 내용이 삭제됩니다."
            })
            .addFields({
                name: "ㅤ",
                value: "검색창은 안정성을 위해 5분의 시간제한이 있습니다.\n검색창이 반응하지 않는다면 다시 시도해주세요.\n또한, 타인의 검색창을 변경하거나 종료할 수 없습니다."
            })
            .setFooter({
                text: "뉴스 물어오는 새우",
                iconURL: "https://cdn.discordapp.com/attachments/973929274744643595/973929352402190356/-001_5.png",
            });
            
    }, // getHelpEmbed

    getQuitEmbed: async function () {
        const { MessageEmbed } = require("discord.js");

        return new MessageEmbed()
            .setColor("#2DB400")
            .setTitle("검색을 종료합니다.")
    }, // getQuitEmbed
    
}; // module.exports
