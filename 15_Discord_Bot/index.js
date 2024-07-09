const { Client, GatewayIntentBits } = require("discord.js");

//GatewayIntentBits are basically the permissions or actions that we give to our bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//This is to handle the message that users send
client.on("messageCreate", (message) => {
  //If message is from Bot then we do not reply
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generating Short ID for" + url,
    });
  }
  message.reply({
    content: "Hi from Bot",
  });
  //   console.log(message);
  //   console.log(message.content);
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!");
});

client.login(
  "MTI2MDE3NTMyNDg2ODc3NjAwNw.G5Bvek.fW5aqq5lU5xMdxuiMz9uAsZPCSL8MZ-CQii7fI"
);
