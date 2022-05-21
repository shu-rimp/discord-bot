module.exports = {
    
    getButton : async function() {
        const { MessageActionRow, MessageButton } = require("discord.js");

        const buttons = [
            {
                customId: "previousPage",
                label: "<",
                style: "SUCCESS",
            },
            {
                customId: "nextPage",
                label: ">",
                style: "SUCCESS",
            },
            {
                customId: "quit",
                label: "✕",
                style: "DANGER",
            },
        ];

        return new MessageActionRow().addComponents(
            buttons.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setStyle(button.style)
            })
        );
    } // getButton

} // module.exports