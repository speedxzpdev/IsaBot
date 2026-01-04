const axios = require("axios");
require("dotenv").config();


async function spotify(ctx) {
  try {
  const link = ctx.message.text
  
  const user = ctx.message.from.first_name
  
  const listMsg = [`Hum... Irei procurar essa música enquanto a gente prepara um lindo pudim! 🍮`, `${user}... Que música legal! Estou baixando pra gente ouvir juntos! 😁`, `Hum... Um ouvir spotify enquanto cozinha é tão bom... Irei baixar! 😋`, `${user}, estou buscando sua música... Tenha paciência e ganhe um bolinho! 🍰`];
  
  
  const randomMsg = listMsg[Math.floor(Math.random() * listMsg.length)];
  
  await ctx.reply(randomMsg, {reply_to_message_id: ctx.message.message_id});
  
  const response = await axios.get(`https://zero-two-apis.com.br/api/spotify/preview?url=${link}&apikey=${process.env.ZEROTWO_APIKEY}`);
  
  const data = response.data.resultado
  
  const info = `Isa Spotify preview!
⤷ Artísta: ${data.artist}
⤷ Título: ${data.title}
⤷ Data: ${data.date}
⤷ Tipo: ${data.type}`
   
   
   await ctx.replyWithPhoto(data.image, {caption: info, reply_to_message_id: ctx.message.message_id});
   
   await ctx.reply("Enviando o áudio...", {reply_to_message_id: ctx.message.message_id});
   
   await ctx.replyWithVoice(data.audio, {reply_to_message_id: ctx.message.message_id});
   
  }
  catch(err) {
    console.error(err)
    const status = err?.response?.status;
    
    if(status === 502 || status === 500) {
      await ctx.reply("Ocorreu um erro no servidor. Tente novamente mais tarde", {reply_to_message_id: ctx.message.message_id});
      return
    }
    
    if(status === 404) {
      await ctx.reply("Este link não existe ou está inválido", {reply_to_message_id: ctx.message.message_id});
      return
    }
    
    
    await ctx.reply("Ocorreu um pequeno problema ao tentar baixar o áudio!", {reply_to_message_id: ctx.message.message_id});
    
  }
  
  
}

module.exports = spotify