"use strict";
const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
  console.info("Aplicativo aberto");
});

client.login("OTUxNjMyMjk4ODIwOTAyOTQy.YiqSpA.e2reDXAYTdatPP2aosvOXZ3TPeg");
