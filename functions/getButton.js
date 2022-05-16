module.exports = {

    getButton : async function() {

        const { MessageActionRow, MessageButton } = require("discord.js");

        const buttons = [
            {
                customId: "previousPage",
                label: "이전페이지",
                style: "SUCCESS",
                emoji: "<:Rocket:960965476673019954>"
            },
            {
                customId: "nextPage",
                label: "다음페이지",
                style: "SUCCESS",
                emoji: "<:Rocket:960965476673019954>"
            },
            // {
            //     customId: "save",
            //     label: "⭐ 찜하기",
            //     style: "PRIMARY",
            // },
            {
                customId: "quit",
                label: "검색종료",
                style: "DANGER",
                emoji: "<:Rocket:960965476673019954>" 
            },
        ];

        return new MessageActionRow().addComponents(
            buttons.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setStyle(button.style)
                    .setEmoji(button.emoji)
            })
        );
    }

} // module.exports