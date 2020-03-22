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
    const countrySelected = args.slice(0).join(" ");

    function checkCountry(country) {
      if (country.id === countrySelected) {
        const embed = new RichEmbed()
          .setColor("#FFA500")
          .setDescription("Coronavirus Bing API")
          .addField("Total confirmado:", `${response.data.totalConfirmed}`)
          .addField(`${country.displayName}:`, `${country.totalConfirmed}`)
          .addField("Mortes totais:", `${country.totalDeaths}`)
          .addField("Casos recuperados:", `${country.totalRecovered}`)
          .addField("Atualizado em:", `${country.lastUpdated}`)
          .setFooter("Criado pelo offtopic Team")
          .setTimestamp();

        message.channel.send(embed);
      }
    }

    ArrayDePaises.filter(checkCountry);

    if (!countrySelected) {
      message.channel.send(
        "Informe como argumento um Country para buscar as infos"
      );
    }

    msg.delete();
  }
};
