const { RichEmbed } = require("discord.js");

module.exports = {
  name: "8ball",
  category: "funny",
  description: "Mention a random user",
  run: async (client, message, args) => {
    if (!args[2]) return message.reply("Faz uma pergunta direito, mano!");
    const replies = [
      "Sim",
      "Não",
      "Talvez",
      "Não faço ideia kk",
      "Provavelmente sim",
      "Provavelmente não"
    ];

    const result = Math.floor(Math.random() * replies.length);
    const question = args.slice(0).join(" ");

    const ballembed = new RichEmbed()
      .setAuthor(
        `${message.author.tag} fez uma pergunta`,
        message.author.avatarURL
      )
      .setColor("#FF9900")
      .addField("Pergunta", question)
      .addField("Resposta", replies[result])
      .setTimestamp()
      .setFooter("Feito por Offtopic Team");

    message.channel.send(ballembed);
  }
};
