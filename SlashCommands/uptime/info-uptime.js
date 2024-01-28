const { SlashCommandBuilder ,ChatInputCommandInteraction, Client, ApplicationCommandOptionType, Colors, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Prime = require('../../schemas.js/uptime/prime')
module.exports = {
    name: 'info',
    description: 'Check Ur Info Uptime',
      options: [
        {
            name: 'uptime',
            description: 'Check Ur Info',
            type: 1,
            options: [],
        }
      ],
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client ,interaction) {
      // return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
        await interaction.deferReply();
        let user = interaction.options.getUser('user') ?? interaction.member;
        let info = await Prime.findOne({
            user: user.user.id
        })
        if (!info) return interaction.editReply({ content: `هذا الشخص غير مشترك 🙄` })
        let embed = new EmbedBuilder()
        .setAuthor({ name: user.user.username, iconURL: user.user.avatarURL({ dynamic: true }) })
        .setDescription(`
        Time: <t:${parseInt(info.time / 1000)}:R>
        Panel : [ Panels: **${info.url}**, Used: **${info.used}**, Unused: **${info.url - info.used}** ]
        `)
        .setColor("#1db954")
        interaction.editReply({ embeds: [embed] })
    },
};