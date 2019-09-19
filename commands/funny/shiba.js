const snek = require("snekfetch");
const APIshiba =
  "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true";

module.exports = {
  name: "shiba",
  category: "funny",
  description: "Send a random dog media.",
  run: async (client, message, args) => {
    const msg = await message.channel.send("> Indo pegar a câmera...");
    const file = (await snek.get(APIshiba)).body[0];
    if (!file)
      return message.channel.send(
        "É, não deu... Foi rápido de mais! Tente de novo ;("
      );

    await message.channel.send({
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
