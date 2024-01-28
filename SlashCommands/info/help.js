const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const fs = require("fs")
const config = require("../../JSON/config.json");
module.exports = {
    name: 'help',
    description: 'To See The Commands',
    async execute(client, interaction) {
        let cod = [];
        const commandFolders = fs.readdirSync("./SlashCommands");
        for (const folder of commandFolders) {
            const commandFiles = fs .readdirSync(`./SlashCommands/${folder}`).filter((file) => file.endsWith(".js")).map((f) => f.split('.js').shift());
            cod.push(
                { "name":folder, "value":`\`\`\`${commandFiles.join('\n')}\`\`\``, "inline": true }
            )
        }
  
        const embed = new EmbedBuilder()
            .setTitle("command server")
            .setDescription("These are the commands available in the server, and the use is initially using (`\\`) and then the name of the command")
            .addFields(cod)
            .setFooter({ text: "Developed By _poweer", iconURL: interaction.user.displayAvatarURL({dynamic: true})})
            .setColor(0x1db954)
            .setTimestamp()
        await interaction.reply({ embeds:[embed], ephemeral:true })
      },
  };