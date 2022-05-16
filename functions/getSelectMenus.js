module.exports = {
    
    getSelectMenus : async function(data, pageNum) {
        const { MessageActionRow, MessageSelectMenu } = require("discord.js");
        const rt = require("./removeTags.js");
        const page = parseInt(pageNum/10) + 1

        return new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("뉴스기사를 선택해주세요.")
                .addOptions([
                    {
                        label: rt.removeTags(data.items[pageNum + 0].title),
                        description: "1 of " + page + " Page",
                        value: "0",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 1].title),
                        description: "2 of " + page + " Page",
                        value: "1",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 2].title),
                        description: "3 of " + page + " Page",
                        value: "2",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 3].title),
                        description: "4 of " + page + " Page",
                        value: "3",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 4].title),
                        description: "5 of " + page + " Page",
                        value: "4",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 5].title),
                        description: "6 of " + page + " Page",
                        value: "5",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 6].title),
                        description: "7 of " + page + " Page",
                        value: "6",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 7].title),
                        description: "8 of " + page + " Page",
                        value: "7",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 8].title),
                        description: "9 of " + page + " Page",
                        value: "8",
                    },
                    {
                        label: rt.removeTags(data.items[pageNum + 9].title),
                        description: "10 of " + page + " Page",
                        value: "9",
                    },
                ]) // MessageSelectMenu
        ); // end of row

    } // getSelectMenus
} // module.exports
