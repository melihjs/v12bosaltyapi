const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
  autoReconnect: true
});
require("./turemeosta/yukleoc.js")(client);
client.on("ready", () => {
  console.log(
    `[BOT]: ${client.user.tag} ismiyle bağlandım!\n[BOT]: İyi kullanımlar!`
  );
  client.user.setPresence({
    activity: {
      name: `turemeosta`,
      url: "https://www.twitch.tv/turemeosta",
      type: "STREAMING"
    },
    status: "idle"
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`[BOT]: ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`[BOT]: ${props.config.name} komutu yüklendi.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
});

client.login(process.env.token).catch(error => { console.log("token yanlış birader.") }); // .env dosyasında token yerinin karşısına token gir.