const { ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const Prime = require('../../schemas.js/uptime/prime')
let { price, priceOne, owner } = require('../../JSON/config.json')
module.exports = {
    name: 'buy',
    description: 'Buy Panels',
    options: [
        {
            name: 'panel',
            description: 'Buy Our Panels',
            type: 1,
            options: [
        {
            name: "number",
            description: "3",
            type: 10,
            required: true,
            choices: [
                { name: "5", value: "5" },
                { name: "7", value: "7" },
                { name: "10", value: "10" },
                { name: "15", value: "15" },
                { name: "25", value: "25" },
                { name: "30", value: "30" },
                { name: "35", value: "35" },
                { name: "40", value: "40" },
                { name: "45", value: "45" },
                { name: "50", value: "50" },
            ],
        }
    ],
        }],
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client, interaction) {
      // return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
         if (interaction.member.roles.cache.has("1171851619487465473")) priceOne = 5000
        await interaction.deferReply()
        let num = interaction.options.getNumber('number')
        let DataOfUser = await Prime.findOne({ user: interaction.user.id })
        if (!DataOfUser) return await interaction.editReply({ content: `You Don't Have Subscription`, ephemeral: true })
        let use = DataOfUser.url
        let used = DataOfUser.used
        let price = num * priceOne
        let tax = Math.floor((price * 20) / 19 + 1);
        let wait = new EmbedBuilder()
            .setTitle(`You have a minute to transfer`)
            .setDescription(`\`\`\`#credit ${owner} ${tax}\`\`\``)
            .setColor("#1db954")
            await interaction.editReply({ embeds: [wait] }).then((me) => {
            let filteruser = u => u.user.id == interaction.user.id
            const collectoruser = interaction.channel.createMessageCollector({ filteruser, time: 1000*60, max: 1, errors: ['time'] });
            collectoruser.on("collect", m => {
                if (!m.content.startsWith(`#credit ${owner} ${tax}`)) {
                    me.delete()
                    collectoruser.stop()
                    return
                }
            })
            const filter = response =>
                response.content.startsWith(
                    `**:moneybag: | ${interaction.user.username}, has transferred `
                ) &&
                response.content.includes(`${owner}`) &&
                response.author.id === `282859044593598464` &&
                response.content.includes(Number(price));
            interaction.channel
                .awaitMessages({
                    filter,
                    max: 1,
                    time: 1000*60,
                    errors: ['time']
                })
                .then(async collected => {
                   const newdata = await Prime.findOneAndUpdate({ user: interaction.user.id },{
                        url: use + num
                    })
                    let Done = new EmbedBuilder()
                    .setDescription(`تم الاشتراك بنجاح الان انت معاك **${use + num}** \n وانت مستخدم **${used }** المتبقي لك **${(use + num) - used}**`)
                    .setColor("#1db954")
                    await interaction.editReply({ content: 'Done ..', embeds: [Done] })
                }).catch(async () => {
                    let Timeout = new EmbedBuilder()
                    .setDescription(`تم انتهاء وقت التحويل`)
                    .setColor("#1db954")
                    await interaction.editReply({ embeds: [Timeout] })
                })
        })
    },
};