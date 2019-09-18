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
      name: "o pessoal se drogando",
      type: "WATCHING"
    }
  });
});

client.on("message", async message => {
  const prefix = "!"; // bot prefix

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
      .addField("Demonstração de afeto?", "PROIBIDO")
      .setDescription("Pode zoar só não pode ofender.")
      .setFooter("Criado pelo offtopic Team")
      .setTimestamp();

    message.channel.send(embed);
  }

  if (cmd === "despacito") {
    try {
      await message.react("🇩");
      await message.react("🇪");
      await message.react("🇸");
      await message.react("🇵");
      await message.react("🇦");
      await message.react("🇨");
      await message.react("🇮");
      await message.react("🇹");
      await message.react("🇴");
    } catch (error) {
      console.error("One of the emojis failed to react.");
    }
  }

  if (cmd === "chama") {
    message.channel.send(`CHAMA NO MEU CARALIO, <@${message.author.id}>`);
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

  if (cmd === "vagas") {
    message.channel.send(
      `<@${message.author.id}> nunca conseguiria uma vaga ;)`
    );
  }
});

client.login(process.env.TOKEN);
