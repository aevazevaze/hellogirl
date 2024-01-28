const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require("discord.js");
const { owners } = require('../../JSON/config.json');
const Prime = require('../../schemas.js/uptime/prime')
const ms = require('ms');
module.exports = {
    name: 'give-infinity',
    description: 'Give infinity',
    options: [
        {
            name:"user",
            description: "give-infinity",
            type: 6,
            required:true
        }
    ],
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(client, interaction) {
      // return interaction.reply({ content: `البوت في صيانه مؤقتا`, ephemeral: true })
        await interaction.deferReply();
        if (!owners.includes(interaction.user.id)) return;
        const user = interaction.options.getMember('user');
        if (user.user.bot == true) return interaction.editReply({ content: `**لا تسطتيع اعطاء البوت اشتراك 🙄**` })
        await Prime.create({
            user: user.user.id,
            url: 99999999,
            time: Date.now() + ms('18262d')
        })
        const d =  await Prime.findOne({
            user: user.user.id
        })
        interaction.editReply({ content: `**Done Give It's Member .**` })
        user.send({ content: `تم اعطاك اشتراك برايم من الابتايم لمدد <t:${parseInt(d.time / 1000)}:R>` })
    },
};