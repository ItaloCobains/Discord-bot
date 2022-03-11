"use strict";

require("dotenv").config();

const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

const DISCORD_BOT_SECRET = process.env.DISCORD_BOT_SECRET;
const PREFIX = process.env.PREFIX;

client.on("ready", () => {
  console.info("Aplicativo aberto!");
});

let game = {
  gameStarted: false,
  userId: null,
  typedNumber: 0,
  randomNumber: 0,
};

const gameDefault = {
  gameStarted: false,
  userId: null,
  typedNumber: 0,
  randomNumber: 0,
};

client.on("message", async (message) => {
  if (message.author.bot) return;

  const command = message.content.includes(PREFIX)
    ? message.content.split(PREFIX)[1]
    : !message.content.includes(PREFIX)
    ? message.content
    : "";
  const author = message.author;

  if (command === "jogar") {
    const embed = printStartGame(author);

    let newMessage = await message.channel.send(embed);

    game.userId = author.id;

    newMessage.react("▶️");
    newMessage.react("⏹️");

    newMessage = await collectReaction(
      newMessage,
      [{ key: "▶️" }, { key: "⏹️" }],
      async (message, reaction) => {
        if (reaction.emoji.name === "▶️") {
          await newMessage.delete({ timeout: 1000 });

          await message.channel.send("Entendi, vamos começar então!");

          await message.channel.send(printEmbed(author));

          game.randomNumber = Math.floor(Math.random() * 10) + 1;
        } else {
          await newMessage.delete({ timeout: 1000 });
          message.channel.send("Tudo bem, fica pra próxima.");

          game = gameDefault;
        }
      }
    );
  } else if (game.userId) {
    if (game.randomNumber === parseInt(command)) {
      await message.channel.send("Você ganhou!");
      game = gameDefault;
    } else {
      await message.channel.send("Você não acertou, tente novamente!");
    }
  }
  if (command === "olá") {
    message.channel.send("mundo");
  } else if (command === "mensagem colorida") {
    const embed = new MessageEmbed()
      .setTitle("Título maneiro")
      .setColor("0xff0000")
      .setDescription("Olá, tudo bem?\nOutra linha.")
      .setAuthor("Eu");

    message.channel.send(embed);
  }
});

function printStartGame(author) {
  const embed = new MessageEmbed()
    .setColor("#e30000")
    .setTitle("Jogo da Sorte")
    .setDescription(`Jogador: ${author.username}`)
    .addField("Vamos iniciar?", "Reaja a essa mensagem com um iniciar")
    .setFooter("Jogo da Sorte")
    .setTimestamp();

  return embed;
}

function printEmbed(author) {
  const embed = new MessageEmbed()
    .setColor("#e30000")
    .setTitle("Jogo da Sorte")
    .setDescription(`Jogador: ${author.username}`)
    .addField("Objetivo", "Descobrir o número em apenas 2 tentativas")
    .addField("Como jogar", "Digite um número de 1 a 10")
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
      errors: ["time"],
    })
    .then(async (collected) => {
      const reaction = collected.first();

      code(message, reaction);
    })
    .catch((err) => {
      message.channel.send("Estou cancelando o nosso game.");
    });

  return newMessage;
}

client.login(DISCORD_BOT_SECRET);
