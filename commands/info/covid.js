const { RichEmbed } = require("discord.js");
const axios = require("axios");
const API = "https://corona.lmao.ninja/countries";

module.exports = {
  name: "covid",
  category: "info",
  description: "Shows current covid total confirmed data",
  run: async (client, message, args) => {
    const msgLoad = await message.channel.send("> Verificando...");

    const countrySelected = args.slice(0).join(" ");

    if (!countrySelected) {
      message.channel.send(
        "Informe como argumento um Country para buscar as infos"
      );
      return msgLoad.delete();
    }

    const finalAPI = `${API}/${countrySelected}`;
    const response = await axios.get(finalAPI);

    const {
      country,
      cases,
      deaths,
      recovered,
      deathsPerOneMillion,
      updated,
    } = response.data;

    const newTime = new Date(updated).toUTCString();

    const embed = new RichEmbed()
      .setColor("#FFA500")
      .setThumbnail(`${response.data.countryInfo.flag}`)
      .setDescription("corona.lmao.ninja/countries - API")
      .addField(`${country}:`, `${cases}`)
      .addField("Casos hoje:", `${todayCases}`)
      .addField("Mortes totais:", `${deaths}`)
      .addField("Casos hoje:", `${todayDeaths}`)
      .addField("Casos recuperados:", `${recovered}`)
      .addField("Mortes por milhao:", `${deathsPerOneMillion}`)
      .addField("Atualizado em:", `${newTime}`)
      .setFooter("Criado pelo offtopic Team")
      .setTimestamp();

    message.channel.send(embed);

    msgLoad.delete();
  },
};
