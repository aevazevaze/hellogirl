const { Client , EmbedBuilder , ActionRowBuilder , ButtonBuilder , ButtonStyle} = require("discord.js");

module.exports = {
    name: "avatar",
    description: `Test the bots response time.`,
    aliases: [],
        async execute(client, msg, args) {
            let embed = new EmbedBuilder()
            .setColor("#008000")
            .setTitle(`Avatar ${msg.author.username}`)
             .setFooter("Codeing By ! PoWeer#9999")
            .setImage(msg.author.displayAvatarURL({dynamic : true, size : 1024}))
            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("png")
                .setURL(msg.author.displayAvatarURL({ format: "jpg", size: 4096  }))
                .setStyle(ButtonStyle.Link)
                .setEmoji("998412036855836703"),
                new ButtonBuilder()
                .setLabel("jpg")
                .setURL(msg.author.displayAvatarURL({forceStatic : 'jpg'}))
                .setStyle(ButtonStyle.Link)
                .setEmoji("998412036855836703"),
                new ButtonBuilder()
                .setLabel("gif")
                .setURL(msg.author.displayAvatarURL({forceStatic : 'gif'}))
                .setStyle(ButtonStyle.Link)
                .setEmoji("998412036855836703")
            ) 
            msg.reply({components : [button] , embeds:[embed]})
        // }
    },
};