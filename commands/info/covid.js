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

    ArrayDePaises.map(pais => {
      if (pais.id === "brazil") {
        const embed = new RichEmbed()
          .setColor("#FFA500")
          .setDescription("Coronavirus Bing API")
          .addField("Total confirmado:", `${response.data.totalConfirmed}`)
          .addField(`${pais.displayName}:`, `${pais.totalConfirmed}`)
          .addField("Atualizado em:", `${pais.lastUpdated}`)
          .setFooter("Criado pelo offtopic Team")
          .setTimestamp();

        message.channel.send(embed);
      } else {
        message.channel.send(
          "Nao foi possivel localizar o Brasil na lista. Contate o adm"
        );
      }
    });

    msg.delete();
  }
};
