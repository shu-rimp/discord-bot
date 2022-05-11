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
    },

    getErrorEmbed: async function (keyword) {
        const { MessageEmbed } = require("discord.js");

        return new MessageEmbed()
            .setColor("#EF5350")
            .setTitle(":warning: 이런! 새우가 길을 잃었네요...")
            .setThumbnail(
                "https://w.namu.la/s/4c27296bd851d7b269203ec98248c5d5a4d7d1bc430c3d2ef225d29d69979d47efb449009f6eeecd4789a192dd089660f0be23c680024acade9eba25341e3545960dc249d9e9c7754e7203a4301ec77d"
            )
            .addFields({
                name: "검색결과를 찾을 수 없습니다.",
                value: "입력한 키워드 : `" + keyword + "`",
            })
            .setFooter({
                text: "[Tip] 올바른 키워드를 입력했나요?",
                iconURL: "https://images.emojiterra.com/twitter/v13.1/512px/1f50d.png",
            });
    },

    getHelpEmbed: async function () {
        const { MessageEmbed } = require("discord.js");

        return new MessageEmbed()
            .setColor("#2DB400")
            .setTitle("새우 이용안내")
            .addFields({
                name: "ㅤ",
                value: "`/검색 [키워드]`\n해당 키워드로 뉴스를 검색합니다.\n키워드가 포함된 100개의 최신 뉴스를 보여줍니다.\n페이지 당 10개의 뉴스를 선택할 수 있습니다.\n선택메뉴에서 원하는 기사를 조회할 수 있습니다.",
            })
            .addFields({
                name: "ㅤ",
                value: "`이전페이지`, `다음페이지`\n버튼을 통해 페이지를 넘길 수 있습니다."
            })
            .addFields({
                name: "ㅤ",
                value: "`검색종료`\n검색을 종료하고 다른 키워드로 검색할 수 있습니다.\n검색종료를 누르지 않고 다음 검색을 시도하면\n에러가 날 수 있습니다.\n이 때는 검색종료 버튼을 눌러 검색을 종료하고\n다시 시도해주세요."
            })
            .addFields({
                name: "ㅤ",
                value: "검색창은 1분동안 활성화됩니다.\n시간이 지나 상호작용이 실패한다면 다시 시도해주세요."
            })
            
    },

    getQuitEmbed: async function () {
        const { MessageEmbed } = require("discord.js");

        return new MessageEmbed()
            .setColor("#2DB400")
            .setTitle("검색을 종료합니다.")
    },

    
}; // module.exports
