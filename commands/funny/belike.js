const snek = require("snekfetch");
module.exports = {
  name: "belike",
  category: "funny",
  description: "Send a random bill media.",
  run: async (client, message, args) => {
    // Verificando se esta sendo passado apenas dois argumentos.
    if (!args[1]) return message.reply("Informacoes faltando!");
    if (args[2])
      return message.reply("Lembre-se de passar apenas <NOME> <GENDER>");

    // Getting args
    const [name, sex] = args.slice(0);
    const sexLower = sex.toLowerCase();

    if (sexLower !== "m" || sexLower !== "f") {
      message.reply("Lembre-se: Segundo argumento deve ser M ou F");
    }

    const APIbill = `https://belikebill.ga/billgen-API.php?default=1&name=${name}&sex=${sexLower}`;
    const msg = await message.channel.send("> Pegando fatos sobre Bill...");

    const file = (await snek.get(APIbill)).body;
    if (!file)
      return message.channel.send(
        "É, não deu... Bill nao quis me contar nada! Tente de novo ;("
      );

    await message.channel.send({
      files: [
        {
          attachment: file,
          name: `${name}.jpg`
        }
      ]
    });

    msg.delete();
  }
};
