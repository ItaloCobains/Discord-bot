"use strict";
require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

client.on("ready", () => {
  console.info("app aberto");
});

let game = {
  gameStarted: false,
  userId: null,
  typeNumber: 0,
  randomNumber: 0,
};

const gameDefault = {
  gameStarted: false,
  userId: null,
  typeNumber: 0,
  randomNumber: 0,
};

client.on("message", async (message) => {
  if (message.author.bot) return;

  // const command = message.content.split(PREFIX)[1];
  const command = message.content.includes(PREFIX)
    ? message.content.split(PREFIX)[1]
    : message.content.includes(PREFIX)
    ? message.content
    : "";
  const author = message.author;

  if (command === "jogar") {
    const embed = printStartGame(author);

    let newMessage = await message.channel.send(embed);

    game.userId = author.id;

    newMessage.react("▶️");
    newMessage.react("⏹️");

    newMessage = await collectReaction(newMessage, [{key: '▶️'}, {key: '⏹️'}], async (message, reaction)=>{
      if(reaction.emoji.name === '▶️'){
        await newMessage.delete({timeout: 1000})

        await message.channel.send("Entendi, vamos começar então !!")

        await message.channel.send()
      }
    })
  }

  if (command === "ola") message.channel.send("Ola");
  else if (command == "msg Colorida") {
    const embed = new MessageEmbed()
      .setTitle("Testando mensagem randola")
      .setColor("oxff0000")
      .setDescription("kenny e gay\n Adriano tbm")
      .setAuthor("I");
    message.channel.send(embed);
  }
});

function printStartGame(author) {
  const embed = new MessageEmbed()
    .setColor("#e30000")
    .setTitle("Jogo da Sorte")
    .setDescription(`Jogador: ${author.username}`)
    .addField("Vamos iniciar?", "Reaja a essa menssagem com o iniciar")
    .setFooter("Jogo da Sorte")
    .setTimestamp();

  return embed;
}
//func do game a baixo, onde parei no codigo e no video foi no minuto 14.59
function printStartGame(author) {
  const embed = new MessageEmbed()
    .setColor("#e30000")
    .setTitle("Jogo da Sorte")
    .setDescription(`Jogador: ${author.username}`)
    .addField("Vamos iniciar?", "Reaja a essa menssagem com o iniciar")
    .setFooter("Jogo da Sorte")
    .setTimestamp();

  return embed;
}


async function collectReaction(message, emojiList, code) {
  const filter = (reaction, user) => {
    return (
      emojiList.find((item) => item.key === reaction.emoji.name).key != null &&
      user.id === game.userId
    );
  };

  const newMessage = await message
    .awaitReactions(filter, {
      max: 1,
      time: 30000,
      erros: ["time"],
    })
    .then(async (collected) => {
      const reaction = collected.first();

      code(reaction);
    })
    .catch((err) => {
      message.channel.send("Estou cancelando o nosso game.");
    });

  return newMessage;
}



client.login(TOKEN);
