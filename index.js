"use strict";
//IMPORTS
require("dotenv").config();
const { Client, MessageAttachment, MessageEmbed } = require("discord.js");
const client = new Client();
const TOKEN = process.env.DISCORD_BOT_SECRET;
const PREFIX = process.env.PREFIX;
const {msg} = require("./models/command");

client.on("ready", () => {
  console.info("run");
});

client.on("message", message => msg(message));

client.login(TOKEN);
