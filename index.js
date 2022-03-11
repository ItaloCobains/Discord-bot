"use strict";
require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

client.on("ready", () => {
  console.info("app aberto");
});

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const command = message.content.split(PREFIX)[1];

  if (command === "ola") message.channel.send("Ola");
  else if (command == "msg Colorida") {
    const embed = new MessageEmbed()
      .setTitle("Testando mensagem randola")
      .setColor("oxff0000")
      .setDescription("kenny e gay\n Adriano tbm")
      .setAuthor('I')
    message.channel.send(embed);
  }
});

client.login(TOKEN);
