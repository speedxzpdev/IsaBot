const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");


require("dotenv").config()

async function isabelaBot() {

const isa = new Telegraf(process.env.TOKEN_BOT);

isa.start( async (ctx) => { 
  await ctx.reply("Oii! Meu nome é Isabela. Para baixar algo só precisa me mandar o link!", {reply_to_message_id: ctx.message.message_id});
  
  await ctx.replyWithSticker('CAACAgEAAxkBAANXaVoPVr0r70457EVJk56dZQfdAhkAAusFAAJfGtBGQRRhZMrG1hw4BA', {reply_to_message_id: ctx.message.message_id});
  
});





//modularização
const cmdPast = path.join(__dirname, "commands");

const filescmd = fs.readdirSync(cmdPast);

for(let cmd of filescmd) {
  
  if(!cmd.endsWith(".js")) continue;
  console.log("carregando", cmd)
  const comando = require(path.join(cmdPast, cmd));
  
  console.log(comando.name, comando.execute)
  
  isa.command(comando.name, (ctx) => comando.execute(ctx, isa));
  
}

//eventos
require("./events/message")(isa)



isa.launch()
console.log("conectado, meu gostoso!");
  
}
isabelaBot()