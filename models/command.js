"use strict";
const { Client, MessageAttachment, MessageEmbed } = require("discord.js");
const client = new Client();
const TOKEN = process.env.DISCORD_BOT_SECRET;
const PREFIX = process.env.PREFIX;

//func

const msg = (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const command = message.content.split(PREFIX)[1];

  //Gerencias do server
  if (command === "help") {
    const embed = new MessageEmbed()
      .setColor("#00ffff")
      .setTitle("**HELP**")
      .setDescription(
        `use o ${PREFIX} junto com seu estilo musical.\n exemplo: ${PREFIX}Rock`
      )
      .addField("**Lista de Generos**", "Rock \nPunk \nFunk \nForro \nanime")
      .setTimestamp();
    message.channel.send(embed);
  } else if (command === "Rock") {
    message.channel.send("https://www.youtube.com/watch?v=Evu9xM4omQo");
  } else if (command === "Punk") {
    message.channel.send("https://www.youtube.com/watch?v=9y2MyMqVD0E&list=PLLVEbKqql9StbBl_CY1ZnzB51t1eZT3te");
  } else if (command === "Funk") {
    message.channel.send("https://www.youtube.com/watch?v=r0mNwyywHIY&list=PLCwAHfhr-Gc82BO57__8Y-wEvZz8ytlHG");
  } else if (command === "Forro") {
    message.channel.send("https://www.youtube.com/watch?v=wOU46EfrjQs&list=PLQGx8UJi4WExC7F3MTYiBWk07DAIg_asD");
  } else if (command === "anime") {
    message.channel.send("https://www.youtube.com/watch?v=iA7uQCruBgU");
  }
};

module.exports = {
  msg,
};
