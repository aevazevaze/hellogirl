const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require("discord.js");
const { owners } = require('../../JSON/config.json');
const Prime = require('../../schemas.js/uptime/prime')
const ms = require('ms');
module.exports = {
    name: 'give-panel',
    description: 'Give Panels',
    options: [
        {
            name:"user",
            description: "give-uptime",
            type: 6,
            required:true
        },
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
                { name: "100", value: "100" },
                { name: "500", value: "500" },
                { name: "1000", value: "1000" },
                { name: "99999999", value: "99999999" },
            ],
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
        let num = interaction.options.getNumber('number')
        if (user.user.bot == true) return interaction.editReply({ content: `**لا تسطتيع اعطاء البوت اشتراك 🙄**` })
        let can = await Prime.findOne({
            user: user.user.id
        })
        if (!can) return interaction.editReply({ content: `**هذ العضو غير مشترك 🤨**` })
        let use = can.url
        let used = can.used
        const newdata = await Prime.findOneAndUpdate({ user: user.user.id } ,{
            url: use + num
        })
        interaction.editReply({ content: `**Done Give It's Member .**` })
        user.send({ content: `تم اعطاك \n panel: ${num}\n used: ${used}\n unused: ${use - used }\n total: ${ use + num }` })
    },
};