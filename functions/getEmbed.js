module.exports = {

    getEmbed : async function(data, selectedValue) {

        const { MessageEmbed } = require("discord.js");
        const rt = require("./removeTags.js");

        return new MessageEmbed()
            .setColor("#2DB400")
            .setTitle(rt.removeTags(data.items[selectedValue].title))
            .setURL(data.items[selectedValue].link)
            // .setAuthor({ name : "`" + keyword + "` 로 검색한 결과입니다."})
            .addFields({
                name: "ㅤ",
                value: rt.removeTags(data.items[selectedValue].description),
            })
            .setFooter({
                text: "Published :: " + data.items[selectedValue].pubDate,
            });
    },

    getErrorEmbed : async function(keyword) {

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
    }
} // module.exports