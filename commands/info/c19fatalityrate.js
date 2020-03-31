const { RichEmbed } = require("discord.js");
const axios = require("axios");
const API =
  "https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateByAge";

module.exports = {
  name: "c19fatalityrate",
  category: "info",
  description: "Shows current covid fatality rate by age",
  run: async (client, message, args) => {
    const msgLoad = await message.channel.send("> Verificando...");

    const response = (await axios.get(API)).data.table;

    response.forEach(element => {
      const embed = new RichEmbed()
        .setColor("#FFA500")
        .setDescription("covid19-server.chrismichael.now.sh API")
        .addField("Idade", `${element.Age}`)
        .addField(
          "Taxa de mortes em todos os casos:",
          `${element.DeathRateAllCases}`
        )
        .setFooter("Criado pelo offtopic Team")
        .setTimestamp();

      message.channel.send(embed);
    });

    msgLoad.delete();
  }
};
