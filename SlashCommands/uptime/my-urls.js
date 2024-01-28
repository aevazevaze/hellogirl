const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const Prime = require('../../schemas.js/uptime/prime')
const Uptime = require('../../schemas.js/uptime/uptime')

module.exports = {
    name: 'my',
    description: 'Check Ur Urls',
      options: [
        {
            name: 'urls',
            description: 'Check Ur Urls',
            type: 1,
            options: [],
        }],
    async execute(client, interaction) {
      // return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
        let user = await Uptime.findOne({ user: interaction.user.id })
        if (!user || user.url.length <= 0) return interaction.reply({content: `> **You Dont Have Any Urls .**`, ephemeral: true})
        let userdata = await Prime.findOne({ user: interaction.user.id })
      if (!userdata)  return interaction.reply({ content: `You Don't Have Subscription`, ephemeral: true })
        let i = userdata?.url
        let u = userdata?.used
        let urls = "";
        //const forLoop = async _ => {
        let data = await Uptime.find({ user: interaction.user.id })
        data.forEach(u => {
            urls += `Url: ${u.url} Id: \`${u._id}\` Status: ${u.status}\n`
        });
        const embed = new EmbedBuilder()
        .setColor("#1db954")
        .setFooter({text: `Uptimer.`, icon: client.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        .setTitle(`\`-\` Your Url :`)
        .setDescription(`You have **${i - u}**\n time left: <t:${parseInt(userdata?.time / 1000)}:R> \n${urls ? urls: "**You Dont Have Any Urls .**"}`)
        return interaction.reply({ embeds: [embed], ephemeral: true })
    },
};