const { RichEmbed } = require("discord.js");

module.exports = {
  name: "rate",
  category: "funny",
  description: "Send a random dog media.",
  run: async (client, message, args) => {
    const randomRate = Math.floor(Math.random() * 11);
    const question = args.slice(0).join(" ");
    const Newratembed = new RichEmbed()
      .setAuthor(
        `${message.author.tag} pediu para eu dar uma nota`,
        message.author.avatarURL
      )
      .setColor("#ffec00")
      .setDescription(`Eu daria uma nota de ${randomRate}/10 para ${question}`)
      .setTimestamp()
      .setFooter("Feito por Offtopic Team");
    message.channel.send(Newratembed);
  }
};
