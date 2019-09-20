const { RichEmbed } = require("discord.js");
const snek = require("snekfetch");
const APIchuck = "https://api.chucknorris.io/jokes/random";

module.exports = {
  name: "chuck",
  category: "funny",
  description: "Sends chuck norris joke",
  run: async (client, message, args) => {
    const resposta = (await snek.get(APIchuck)).body;
    console.log(resposta);

    const embed = new RichEmbed()
      .setColor("#FFA500")
      .setThumbnail(`${resposta.icon_url}`)
      .setAuthor("Chuck Norris", `${resposta.icon_url}`, `${resposta.url}`)
      .setDescription("Chuck Norris Jokes API")
      .addBlankField()
      .addField("Joke:", `${resposta.value}`)
      .addBlankField()
      .setFooter("Criado pelo offtopic Team")
      .setTimestamp();

    message.channel.send(embed);
  }
};
