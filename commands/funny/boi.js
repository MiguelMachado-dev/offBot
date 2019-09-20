module.exports = {
  name: "boi",
  category: "funny",
  description: "Send a random boi rate.",
  run: async (client, message, args) => {
    const randomRate = Math.floor(Math.random() * 11);
    const users = message.guild.members.random();
    message.channel.send(`A chance de ${users.user} ser boi é ${randomRate}/10`);
  }
};

