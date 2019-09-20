const axios = require("axios");
const APIbirb = "http://random.birb.pw/tweet.json";

module.exports = {
  name: "birb",
  category: "funny",
  description: "Send a random birb meme.",
  run: async (client, message, args) => {
    const msg = await message.channel.send("> Indo pegar a câmera...");
    const file = (await axios.get(APIbirb)).data.file;
    const fileURL = `https://random.birb.pw/img/${file}`;
    if (!fileURL)
      return message.channel.send(
        "É, não deu... Foi rápido de mais! Tente de novo ;("
      );

    await message.channel.send({
      files: [
        {
          attachment: fileURL,
          name: file.split("/").pop()
        }
      ]
    });

    msg.delete();
  }
};
