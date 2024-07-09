//This file contains the commands that start with /

const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  "MTI2MDE3NTMyNDg2ODc3NjAwNw.G5Bvek.fW5aqq5lU5xMdxuiMz9uAsZPCSL8MZ-CQii7fI"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1260175324868776007"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
