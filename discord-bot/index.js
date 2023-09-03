const { Client, GatewayIntentBits } = require("discord.js") ;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", message=>{
  if(message.author.username !== "Bot1"){
    message.reply("Hello, "+ message.author.globalName);
  }
})

client.on("interactionCreate", interaction=>{
  console.log(interaction);
  interaction.reply("Pong!")
})

client.login("MTE0MzkxNzk1MzU2NjM5NjQ5Nw.GozOXj.jfQUA04XDdB1cUI3zC5E6_IP2NyYJqX8t9-pMU");