 const { Client, SlashCommandBuilder ,Message, EmbedBuilder, ModalSubmitFields,PermissionsBitField , Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType, flatten} = require("discord.js");

 module.exports = {
     name: "control",
     description: `Test the bots response time.`,
    aliases: [],
         async execute(client, msg, args) {
           //  if (!msg.member.permissions.has(PermissionsBitField.Flags.Administrator))return msg.editReply("You Don't Have Permission",{ephemeral:true})
             if(msg.author.bot) return
           //  await msg.deferReply()
             if (!msg.member.permissions.has(PermissionsBitField.Flags.Administrator))return msg.editReply("You Don't Have Permission",{ephemeral:true})
            else msg.delete()
             const button = new ActionRowBuilder()
             .addComponents(
                 new ButtonBuilder()
                 .setCustomId("1")
                 .setLabel("Lock")
                 .setEmoji("🔒")
                 .setStyle(ButtonStyle.Success),
                 new ButtonBuilder()
                 .setCustomId("2")
                .setLabel("UNLock")
                 .setEmoji("🔓")
                 .setStyle(ButtonStyle.Danger),
             )
             let button2 =new ActionRowBuilder()
             .addComponents(
                 new ButtonBuilder()
                 .setCustomId("3")
                 .setLabel("Show")
                 .setEmoji("👀")
                 .setStyle(ButtonStyle.Success),
                 new ButtonBuilder()
              .setCustomId("4")
              .setLabel("Hide")
               .setEmoji("👁️")
                .setStyle(ButtonStyle.Danger),
            )
             msg.channel.send({ components : [button , button2], content : `تحكم في روم <#${msg.channel.id}>`})
             client.on("interactionCreate" , (i) => {
                 if(i.customId === "1") {
                             i.channel.edit({
                                 permissionOverwrites: [
                                     { type: 'role', id: i.guild.roles.everyone, deny: ['SendMessages'] },
                                 ],
                             });
                             i.reply({content:'Done', ephemeral:true})
                 }else if(i.customId === "2") {
                     i.channel.edit({
                         permissionOverwrites: [
                             {type: 'role' , id: i.guild.roles.everyone, allow: ['SendMessages']}
                         ]
                     })
                     i.reply({content:'Done', ephemeral:true})
                 }else if(i.customId === "3") {
                    i.channel.edit({
                         permissionOverwrites: [
                             {type: 'role' , id: i.guild.roles.everyone, allow: ['ViewChannel']}
                        ]
                     })
                     i.reply({content:'Done', ephemeral:true})
                 }else if(i.customId === "4") {
                     i.channel.edit({
                         permissionOverwrites: [
                             {type: 'role' , id: i.guild.roles.everyone, deny: ['ViewChannel']}
                        ]
                     })
                   i.reply({content:'Done', ephemeral:true})
                }
             })
     },
 };