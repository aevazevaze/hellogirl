const { MessageEmbed, CommandInteraction } = require('discord.js')

module.exports = {
name: "ping",
description: "Bot Ping",
async execute(client, interaction) {
    interaction.reply({ content: `:ping_pong: **Ping ${client.ws.ping} ms**`, ephemeral:true });

}
}