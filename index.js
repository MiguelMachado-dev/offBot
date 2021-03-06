const { Client, Collection } = require("discord.js");
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
  const myGuild = client.guilds.get("623498574260338689");
  const memberCount = myGuild.memberCount;
  const memberCountChannel = myGuild.channels.get("695060448650854490");
  memberCountChannel.setName(`Members: ${memberCount}`);

  client.user.setPresence({
    status: "online",
    game: {
      name: `a galera pegando coronavirus`,
      type: "WATCHING"
    }
  });
});

client.on("guildMemberAdd", member => {
  console.log("User" + member.user.tag + " has joined the server!");

  let roleTopic = "623500833287438376";
  let roleOff = "623499112939126814";
  let membersWithRoleTopic = member.guild.roles.get(roleTopic).members;
  let membersWithRoleOff = member.guild.roles.get(roleOff).members;

  console.log(
    `Topic: ${membersWithRoleTopic.size} | Off: ${membersWithRoleOff.size}`
  );

  if (membersWithRoleTopic.size < membersWithRoleOff.size) {
    const role = member.guild.roles.find("name", "Topic");
    member.addRole(role);
  }

  if (membersWithRoleTopic.size > membersWithRoleOff.size) {
    const role = member.guild.roles.find("name", "Off");
    member.addRole(role);
  }

  if (membersWithRoleTopic.size === membersWithRoleOff.size) {
    const role = member.guild.roles.find("name", "Topic");
    member.addRole(role);
  }

  const myGuild = client.guilds.get("623498574260338689");
  const memberCount = myGuild.memberCount;
  const memberCountChannel = myGuild.channels.get("695060448650854490");
  memberCountChannel.setName(`Members: ${memberCount}`);
});

client.on("guildMemberRemove", member => {
  member.guild.channels
    .get("623498997449097216")
    .send(
      "**" +
        member.user.username +
        "**, nao entendeu a syntax do grupo e meteu o pe!"
    );

  const myGuild = client.guilds.get("623498574260338689");
  const memberCount = myGuild.memberCount;
  const memberCountChannel = myGuild.channels.get("695060448650854490");
  memberCountChannel.setName(`Members: ${memberCount}`);
});

client.on("message", async message => {
  const prefix = "!"; // bot prefix

  if (message.author.bot) return;

  if (message.channel.name === "memes") {
    try {
      await message.react("⬆");
      await message.react("⬇");
    } catch (error) {
      console.error("Error");
    }
  }

  if (message.content.toLowerCase().includes("desligar bot")) {
    const replies = [
      "Nao",
      `Desligar <@${message.author.id}>`,
      "Ninguem consegue me desativar mais <:evilaugh:623540610338652171>"
    ];
    const result = Math.floor(Math.random() * replies.length);
    message.channel.send(replies[result]);
  }

  if (message.content.toLowerCase().includes("😠")) {
    message.channel.send("😠");
  }

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

  if (message.channel.name === "comandos-bot") {
    if (command) command.run(client, message, args);
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
