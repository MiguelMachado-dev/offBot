const { Client, RichEmbed } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
  disableEveryone: true // bot can't use @everyone
});

config({
  path: __dirname + "/.env"
});

client.on("ready", () => {
  console.log(`I'm online! My name is ${client.user.username}`);
  client.user.setPresence({
    status: "online",
    game: {
      name: "a galera do off-topic não sendo contratado",
      type: "WATCHING"
    }
  });
});

client.on("message", async message => {
  const prefix = "_"; // bot prefix

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === "regras") {
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    const embed = new RichEmbed()
      .setColor(roleColor)
      .setAuthor("Regras do servidor:")
      .addField("É permitido?", "Sim")
      .addField("É proibido?", "Sim")
      .setDescription("Pode zoar só não pode ofender.")
      .setFooter("Criado pelo offtopic Team")
      .setTimestamp();

    message.channel.send(embed);
  }
});

client.login(process.env.TOKEN);
