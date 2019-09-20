const { RichEmbed } = require("discord.js");

module.exports = {
  name: "rate",
  category: "funny",
  description: "Send a random dog media.",
  run: async (client, message, args) => {
    const randomRate = Math.floor(Math.random() * 11);
    const question = args.slice(0).join(" ");
    const users = message.guild.members.random();
    const Newratembed = new RichEmbed()
      .setColor("#ffec00")
      .setDescription(`A chance de ${users.user} ser boi é ${randomRate}/10`)
      .setTimestamp()
      .setFooter("Feito por Offtopic Team");
    message.channel.send(Newratembed);
  }
};
