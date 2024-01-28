const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const Prime = require('../../schemas.js/uptime/prime')
const ms = require('ms')
let { price, priceOne, owner } = require('../../JSON/config.json')
module.exports = {
    name: 'uptime',
    description: "Buy Ur Uptime Prime",
    options: [
        {
            name: 'prime',
            description: 'Prime Uptime',
            type: 1,
            options: [],
        }],
    async execute(client, interaction) {
       //return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
         if (interaction.member.roles.cache.find(r => r.id === "1171851619487465473")) price = 5000
        await interaction.deferReply()
        let u = await Prime.findOne({ user: interaction.user.id })
        if (u?.stop == 'true') return interaction.editReply({ content: `**انت مشترك لاكن الاشتراك الخاص بيك منتهي لتجديد الاشتراك \`/renew-uptime\`**` })
        if (u) return interaction.editReply({ content: `** انت مشترك بالفعل اذا كنت شراء المزيد استخدم امر \`buy panel\`.**` })
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
                    await Prime.create({
                        user: interaction.user.id,
                        url: 5,
                        time: Date.now() + ms('30d')
                    })
                    let newdate = await Prime.findOne({ user: interaction.user.id })
                    let Done = new EmbedBuilder()
                    .setDescription(`En :🇺🇸: Your uptime subscription has been successfully completed
                    You now have **5** links to upload them
                    If you want to buy more use \`buy-panel\`

                    Ar :flag_eg: تم الاشتراك في الابتايم بنجاح 
                    انت الان لديك **5** روابط لرفعهم 
                    اذا كنت تريد الشراء اكثر استخدم \`buy-panel\`
                    
					> **Don't Forget Your Feedback <#1101578738669469878>**
                    time left : <t:${parseInt(newdate.time / 1000)}:R>
                    `)
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