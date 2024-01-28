const client = require("../../index");
const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        if (!interaction.channel.guild) return;

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}
