const { Client, RichEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
  disableEveryone: true // bot can't use @everyone
});

client.commands = new Collection();
client.aliases = new Collection();

config({
  path: __dirname + "/.env"
});

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
  console.log(
    `${client.user.username} is online on ${client.guilds.size} servers!`
  );
  client.user.setPresence({
    status: "online",
    game: {
      name: "o pessoal se drogando",
      type: "WATCHING"
    }
  });
});

client.on("message", async message => {
  const prefix = "!"; // bot prefix

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return; // check this line
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

  if (cmd === "chama") {
    message.channel.send(`CHAMA NO MEU CARALIO, <@${message.author.id}>`);
  }

  if (message.channel.id === "624051516038447252") {
    console.log("message in Memes");
    try {
      await message.react("⬆");
      await message.react("⬇");
    } catch (error) {
      console.error("Error");
    }
  }

  if (cmd === "quarentena") {
    // getting the member mentioned
    const user = message.mentions.users.first();

    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        message.channel.send(`O usuário ${user} foi enviado para quarentena!`);
      } else {
        // The mentioned user isn't in this guild
        message.reply("Este usuário não está na guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("Você não mencionou um usuário.");
    }
  }
});

client.login(process.env.TOKEN);
