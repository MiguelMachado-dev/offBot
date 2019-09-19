const snek = require("snekfetch");
const APIdog = "https://random.dog/woof.json";
module.exports = {
  name: "woof",
  category: "funny",
  description: "Send a random dog media.",
  run: async (client, message, args) => {
    const msg = await message.channel.send("> Indo pegar a câmera...");

    const file = (await snek.get(APIdog)).body.url;
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
