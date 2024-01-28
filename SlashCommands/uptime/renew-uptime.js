const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const Prime = require('../../schemas.js/uptime/prime')
const Uptime = require('../../schemas.js/uptime/uptime')
let { price, priceOne, owner } = require('../../JSON/config.json')

const ms = require('ms')
module.exports = {
    name: 'renew',
    description: 'renew ur uptime',
      options: [
        {
            name: 'uptime',
            description: 'renew',
            type: 1,
            options: [],
        }],
    async execute(client, interaction) {
      // return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
         if (interaction.member.roles.cache.find(r => r.id === "1171851619487465473")) price = 5000
        await interaction.deferReply()
        let u = await Prime.findOne({ user: interaction.user.id })
        if (!u) return interaction.editReply({ content: `انت غير مشترك لاشتراك \`/uptime prime\`` })
        if (u.time >= Date.now()) return interaction.editReply({ content: `الاشتراك االخاص بك لم ينتهي بعد .` })
        let tax = Math.floor((price * 20) / 19 + 1);
        let wait = new EmbedBuilder()
            .setTitle(`You have a minute to transfer`)
            .setDescription(`\`\`\`#credit ${owner} ${tax}\`\`\``)
            .setColor("#1db954")
        interaction.editReply({ embeds: [wait] }).then((me) => {
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
                        time: Date.now() + ms('30d'),
                        stop: false,
                        send: false
                    })
                    let uptimes = await Uptime.find({ user: interaction.user.id })
                    uptimes.forEach(async (x) => {
                        await x.updateOne({ stop: false })
                    })
                    let newdate = await Prime.findOne({ user: interaction.user.id })
                    let Done = new EmbedBuilder()
                    .setDescription(`تم تجديد اشتراك بنجاح
    
                    time left : <t:${parseInt(newdate.time / 1000)}:R>
                    `)
                    .setColor("#1db954")
                    interaction.editReply({ content: 'Done ..', embeds: [Done] })
                }).catch(() => {
                    let Timeout = new EmbedBuilder()
                    .setDescription(`تم انتهاء وقت التحويل`)
                    .setColor("#1db954")
                    interaction.editReply({ embeds: [Timeout] })
                })
        })
    },
};