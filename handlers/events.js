const fs = require('fs');
const ascii = require('ascii-table');
let table = new ascii(`Events`);
table.setHeading('Event', 'Load Status');

module.exports = (client) => {
    fs.readdirSync('./events').forEach(folder => {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.name) {
                client.events.set(event.name, event);
                table.addRow(event.name, '🟢 Working');
            } else {
                table.addRow(file, '🔴 Not working');
                continue;
            } if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
        }
    })
    console.log(table.toString());
}