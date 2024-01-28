const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const Prime = require('../../schemas.js/uptime/prime')
const Uptime = require('../../schemas.js/uptime/uptime')
module.exports = {
    name: 'del',
    description: 'description',
    options: [
        {
            name: 'uptime',
            description: 'Delete Ur Urls',
            type: 1,
            options: [{
        name: "id",
        description: "channel you want to set it",
        type: 3,
        required: true,
    }],
        }],
    async execute(client, interaction) {
      // return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
        let url = interaction.options.getString('id')
        let user = await Uptime.findOne({ user: interaction.user.id })
        let usery = await Prime.findOne({ user: interaction.user.id })
      
        let min = usery.used
        if (!user || user.url.length <= 0) return interaction.reply({content: `> **You Dont Have Any Urls .**`, ephemeral: true })
        let myurl = await Uptime.findByIdAndDelete(url)
        if (!myurl) return interaction.reply({ content: `> **This link does not exist**`, ephemeral: true })
            const newdata = await Prime.findOneAndUpdate({ user: interaction.user.id },{
            used: min - 1
        })
        interaction.reply({ content: `> **Done**`, ephemeral: true })
    },
};