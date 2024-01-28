const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");
const Prime = require('../../schemas.js/uptime/prime')
const Uptime = require('../../schemas.js/uptime/uptime')

module.exports = {
    name: 'uptime-url',
    description: 'Add Ur Urls',
    options: [{
        name: "url",
        description: "Urls",
        type: 3,
        required: true,
    }],
    async execute(client, interaction) {
      // return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
        let url = interaction.options.getString('url')
        if (!url.startsWith('http')) return interaction.reply({ content: `Please put a link`, ephemeral: true })
        let userprime = await Prime.findOne({ user: interaction.user.id })
        if (!userprime) return interaction.reply({ content: `You Don't Have Subscription`, ephemeral: true })
        if (userprime.stop == "true") return interaction.reply({ content: `الاشتراك الخاص بك منتهي لتجديد الاشتراك \`/renew-uptime\``, ephemeral: true })
        let max = userprime.url
        let min = userprime.used
        if (max <= min) return interaction.reply({ content: `En :en: : You have reached the limit for uploading links to upload more you can buy \`buy-panel\` \n Ar :flag_eg: : لقد وصلت الي الحد الاقصي ل رفع الروابط لرفع المزيد يمكنك الشراء \`buy-panel\``, ephemeral: true })
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOKDDGPQRSTUVWXYZabc548484defghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }
        const StoreOriginTag = makeid(6)
        let id = StoreOriginTag
        let can = await Uptime.findOne({ url: url })
        if (can) return interaction.reply({ content: `**This link already exists**`, ephemeral: true })
  const newdata = await Prime.findOneAndUpdate({user: interaction.user.id},{
            used: min + 1
        })
        await Uptime.create({
            _id: id,
            url: url,
            user: interaction.user.id
        })
      if ( min === 0 ) min = 1
        interaction.reply({ content: `Done You Now Have ${max - min}`, ephemeral: true }).then(() => {
            let embed = new EmbedBuilder()
            .setDescription(`Url: ${url} \n Id: \`${id}\``)
            .setColor("#1db954")
            interaction.guild.members.cache.get(interaction.user.id)?.send({ embeds: [ embed ] })
        })
    },
};