const { Client, RichEmbed, Collection } = require("discord.js");

module.exports = {
  name: "regras",
  category: "info",
  description: "Shows server rules",
  run: async (client, message, args) => {
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
};
