const snek = require("snekfetch");
const APIrandom = "https://meme-api.herokuapp.com/gimme";

module.exports = {
  name: "random",
  category: "funny",
  description: "Send a random meme.",
  run: async (client, message, args) => {
    const msg = await message.channel.send("> Calma ae");

    const responseApi = (await snek.get(APIrandom)).body;
    const file = responseApi.url;

    if (!file) return message.channel.send("É, não deu... Tente de novo ;(");

    await message.channel.send(`${responseApi.title}`, {
      files: [
        {
          attachment: file,
          name: file.split("/").pop()
        }
      ]
    });

    msg.delete();
  }
};
