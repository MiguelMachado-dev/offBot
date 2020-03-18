const { RichEmbed } = require("discord.js");
const axios = require("axios");
const API = "https://bing.com/covid/data?IG=77FA7950EEDF463C90224AAC611E9EE8";

module.exports = {
  name: "covid",
  category: "info",
  description: "Shows current covid total confirmed data",
  run: async (client, message, args) => {
    const msg = await message.channel.send("> Verificando...");
    const response = await axios.get(API);

    const Brazil = response.data.areas[26];

    const embed = new RichEmbed()
      .setColor("#FFA500")
      .setDescription("Coronavirus Bing API")
      .addField("Total confirmado:", `${response.data.totalConfirmed}`)
      .addField(`${Brazil.displayName}:`, `${Brazil.totalConfirmed}`)
      .addField("Atualizado em:", `${Brazil.lastUpdated}`)
      .setFooter("Criado pelo offtopic Team")
      .setTimestamp();

    message.channel.send(embed);

    msg.delete();
  }
};
