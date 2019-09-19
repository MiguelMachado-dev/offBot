const snek = require("snekfetch");
const APIcat = "http://aws.random.cat/meow";

module.exports = {
  name: "meow",
  category: "funny",
  description: "Send a random dog media.",
  run: async (client, message, args) => {
    const msg = await message.channel.send("> Indo pegar a câmera...");

    const file = (await snek.get(APIcat)).body.file;
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
