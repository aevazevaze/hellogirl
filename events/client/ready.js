const { Client, Interaction, ActivityType } = require('discord.js');
const { prefix, token } = require('../../JSON/config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { joinVoiceChannel } = require('@discordjs/voice');
let db = require('pro.db')
const player = require("../../client/player");
const mongoose = require('mongoose')
const {mongodbURL} = require('../../JSON/config.json');
const Prime = require('../../schemas.js/uptime/prime')
const Uptime = require('../../schemas.js/uptime/uptime');
let owner = "720001232403562597";
const ms = require('ms')
// const mongodbURL = 

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    if (db.get(`timeset`) !== true) {
      db.set(`time${client.user.id}`, ms('2m'))
      db.set(`timeset`, true)
    }
    setInterval(async() => {
      if (Date.now >= db.get(`time${client.user.id}`)) {
        let user = client.users.cache.get(owner)
        client.destroy().then(async () => {
          if (db.get(`send`) == true) return;
          user.send({ content: `البوت خلص !!` })
          await db.set(`send`, true)
        })
      }
    }, 1000)
    console.log(`${client.user.tag}`);
    client.user.setStatus("online")
    client.user.setActivity(`Uptime Premium`, { type: ActivityType.Competing })
    const commands = client.slashCommands.map(({ execute, ...data }) => data);
    // Register slash commands
    const rest = new REST({ version: '10' }).setToken(token);
    rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    ).then(() => console.log('Successfully registered application commands.')).catch(console.error)
    mongoose.set("strictQuery", false)
    mongoose.connect(mongodbURL, {}).then(() => {
      console.log("mongoose is connection")
    }).catch(err => {
      console.log("mongoose is not connection")
    })
    const fetch = require("node-fetch");
    async function uptimer() {
      const uptime = await Uptime.find({})
      uptime.forEach(async url => {
        try {
          if (url.stop == "false") {
            await fetch(url.url).then(async () => {
              await url.updateOne({ status: "Uptimed" })
               //console.log(`${url.url} - Uptimed`)
            }).catch(async () => {
              await url.updateOne({ status: "Down" })
              //console.log(`${url.url} - Down`)
            })
          }
        }
        catch (error) {
          console.log(error)
        }
      })
    }

    async function UserStop() {
      const user = await Prime.find({})
      user.forEach(async u => {
        try {
          if (Date.now() >= u.time) {
            await u.updateOne({ stop: true })
            if (u.send == "false") {
              let user = client.users.cache.get(u.user)
              user.send({ content: `تم انتهاء الاشتراك الخاص بك لتجديد الاشتراك \`/renew-uptime\`` }).then(() => u.updateOne({ send: true })).catch(err => { return })
            }
            let uptimes = await Uptime.find({ user: u.user })
            uptimes.forEach(async x => {
              await x.updateOne({ stop: true })
            })
          }
        } catch {
          console.log('في مشكله')
        }
      })
    }

     setInterval(() => {
       UserStop();
       uptimer();
     }, 5000)
  }
};