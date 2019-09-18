module.exports = {
  name: "vagas",
  category: "funny",
  description: "Mention a random user",
  run: async (client, message, args) => {
    const users = message.guild.members.random();
    message.channel.send(
      `${users.user} nunca conseguiria uma vaga <:wutcat:623566045306683432>`
    );
  }
};
