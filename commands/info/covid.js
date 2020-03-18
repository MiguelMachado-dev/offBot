const { RichEmbed } = require("discord.js");
const axios = require("axios");
const API = "https://bing.com/covid/data";

module.exports = {
  name: "covid",
  category: "info",
  description: "Shows current covid total confirmed data",
  run: async (client, message, args) => {
    const msg = await message.channel.send("> Verificando...");
    const response = await axios.get(API);

    const ArrayDePaises = response.data.areas;

    function checkCountry(country) {
      if (country.id === "brazil") {
        const embed = new RichEmbed()
          .setColor("#FFA500")
          .setDescription("Coronavirus Bing API")
          .addField("Total confirmado:", `${response.data.totalConfirmed}`)
          .addField(`${country.displayName}:`, `${country.totalConfirmed}`)
          .addField("Atualizado em:", `${country.lastUpdated}`)
          .setFooter("Criado pelo offtopic Team")
          .setTimestamp();

        message.channel.send(embed);
      }
    }

    ArrayDePaises.filter(checkCountry);

    msg.delete();
  }
};
