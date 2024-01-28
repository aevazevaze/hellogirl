const fs = require('fs');
const ascii = require('ascii-table');
let table = new ascii(`Commands`);
table.setHeading('Command', 'Load Status');
const { prefix } = require('../JSON/config.json');

module.exports = (client) => {
fs.readdirSync('./commands').forEach((folder) => {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (file of commandFiles) {
        let command = require(`../commands/${folder}/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
            table.addRow(`${prefix}${command.name}`, '🟢 Working');
        } else {
            table.addRow(file, '🔴 Not working');
            continue;
        }
    }
});
console.log(table.toString());
}