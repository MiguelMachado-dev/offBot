const { RichEmbed } = require("discord.js");
const axios = require("axios");
const APIweather = "http://dataservice.accuweather.com/currentconditions/v1";
const APItoGetKey =
  "http://dataservice.accuweather.com/locations/v1/cities/search";

module.exports = {
  name: "weather",
  category: "info",
  description: "Shows current location weather",
  run: async (client, message, args) => {
    const location = args.slice(0).join(" ");
    const encodedLocation = encodeURI(location);
    const urlParaDescobrirKey = `${APItoGetKey}?apikey=${process.env.WEATHER}&q=${encodedLocation}&language=pt-br`;

    try {
      const keyResult = (await axios.get(urlParaDescobrirKey)).data;

      const LocationKey = keyResult[0].Key;

      const url = `${APIweather}/${LocationKey}?apikey=${process.env.WEATHER}&language=pt-br`;
      const result = (await axios.get(url)).data;

      const roleColor =
        message.guild.me.displayHexColor === "#000000"
          ? "#ffffff"
          : message.guild.me.displayHexColor;

      const embed = new RichEmbed()
        .setColor(roleColor)
        .setAuthor(
          `AccuWeather: ${location}`,
          "https://lh3.googleusercontent.com/iS1JDAsBL9-_dessIjyaqtSfQl80XGVVnMoaNt1s-TzUydIDu4xId8Chjog3e6etA0k",
          `${result[0].Link}`
        )
        .setThumbnail(
          "https://apidev.accuweather.com/developers/Media/Default/logo//awx-logo-orange.png"
        )
        .addField("Tempo", `${result[0].WeatherText}`)
        .addField("Temperatura", `${result[0].Temperature.Metric.Value} C`)
        .setFooter("Criado pelo offtopic Team")
        .setTimestamp();

      message.channel.send(embed);
    } catch (error) {
      message.channel.send(error.response.data.Message);
    }
  }
};
