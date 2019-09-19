const { RichEmbed } = require("discord.js");
module.exports = {
  name: "changelog",
  category: "admin",
  description: "Create changelog",
  run: async (client, message, args) => {
    // TODO: Make bot send changelog message to a specific channel

    if (message.member.roles.find("name", "botDev")) {
      const change = args.join(" ");
      message.delete().catch(O_o => {});
      const changeEmbed = new RichEmbed()
        .setColor("#FFAA44")
        .setAuthor("Trench: Changelog and upcoming", `${client.user.avatarURL}`)
        .addField("Changelog:", `${change}`)
        .setFooter("Powered by OffTopic Team")
        .setTimestamp();

      message.channel.send(changeEmbed).then(async embedMessage => {
        await embedMessage.react("👍");
        await embedMessage.react("👎");
      });
    } else {
      message.channel.send(
        "Você não tem permissão para utilizar deste comando."
      );
    }
  }
};
