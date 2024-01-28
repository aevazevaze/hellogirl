const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const { Client, Collection, Partials, GatewayIntentBits, EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const { readdirSync } = require('node:fs');
const config = require("./JSON/config.json");
const { token , mongoose } = require("./JSON/config.json");
const db = require('pro.db')
const client = new Client({
  intents:131071,
  // intents: [
  //   GatewayIntentBits.Guilds,
  //   GatewayIntentBits.GuildMembers,
  //   GatewayIntentBits.GuildEmojisAndStickers,
  //   GatewayIntentBits.GuildIntegrations,
  //   GatewayIntentBits.GuildWebhooks,
  //   GatewayIntentBits.GuildInvites,
  //   GatewayIntentBits.GuildVoiceStates,
  //   GatewayIntentBits.GuildPresences,
  //   GatewayIntentBits.GuildMessages,
  //   GatewayIntentBits.GuildMessageReactions,
  //   GatewayIntentBits.GuildMessageTyping,
  //   GatewayIntentBits.DirectMessages,
  //   GatewayIntentBits.DirectMessageReactions,
  //   GatewayIntentBits.DirectMessageTyping,
  //   GatewayIntentBits.MessageContent
  // ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ],
  shards: "auto",
  allowedMentions: { repliedUser: false },
});

//nodejs-events
process.on("unhandledRejection", e => {
  console.log(e)
})
process.on("uncaughtException", e => {
  console.log(e)
})
process.on("uncaughtExceptionMonitor", e => {
  console.log(e)
})



module.exports = client;
client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
readdirSync('./handlers').forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
const { joinVoiceChannel } = require('@discordjs/voice');
client.on('ready', () => {
    
    setInterval( async () => {
    client.channels.fetch("1172259142199693322") 
     .then((channel) => { 
      const VoiceConnection = joinVoiceChannel({
       channelId: channel.id, 
       guildId: channel.guild.id, 
       adapterCreator: channel.guild.voiceAdapterCreator 
       });
    }).catch((error) => { return; });
    }, 1000)
}); 
setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3 * 1000 * 60);
client.login(token ? token : process.env.token).catch((err) => {
  console.log(err.message)
})