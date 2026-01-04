const axios = require("axios");
require("dotenv").config();


async function tiktokdl(ctx) {
  
  try {
    
    const user = ctx.message.from.first_name
    
    const text = ctx.message.text
    
    const listEspera = [`${user}... Estou preparando bolinhos enquanto termino seu download! 🍰`, `Procurando vídeo mais rápido que eu comendo pudim! 🍮`,`Enquanto você espera estárei aqui fazendo um cookie pra você! 🍪`, `${user}, estou verificando se os cabos estão conectados... Mas antes preciso de um pudim! 😋 `, `Buscando vídeo, a resposta vai sair melhor que um bolinho quente! 🔥`];
    
    const randomEspera = listEspera[Math.floor(Math.random() * listEspera.length)];
    
    await ctx.reply(randomEspera, {reply_to_message_id: ctx.message.message_id});
    
    const req = await axios.get(`https://zero-two-apis.com.br/api/download/tiktok?url=${text}&apikey=${process.env.ZEROTWO_APIKEY}`);
    
    const data = req.data.resultado
    
    const legenda = `Isabela Donwloads!
⤷ User: ${data.author.nickname}
→ Título: ${data.desc}
→ Likes: ${data.statistics.likeCount}
→ Vizualizações: ${data.statistics.playCount}
→ Comentários: ${data.statistics.commentCount}`
    
    if(data.type === "image") {
      const infoImage = await ctx.reply(legenda, {reply_to_message_id: ctx.message.message_id});
      
      const fotos = data.images
      
      for(let img of fotos) {
        await ctx.replyWithPhoto(img, {reply_to_message_id: infoImage.message_id});
      }
      
    }
    
    if(data.type === "video") {
    await ctx.replyWithVideo(data.video.playAddr[0], {caption: legenda});
    }
    
    await ctx.reply("Buscando pelo melhor áudio...");
    
    await ctx.replyWithVoice(data.music.playUrl[0], {caption: data.music.title});
    
  }
  catch(err) {
    console.error(err)
    const status = err?.response?.status;
    
    if(status === 502) {
      await ctx.reply("Ocorreu um erro no servidor. Tente novamente mais tarde", {reply_to_message_id: ctx.message.message_id});
      return
    }
    
    
  }
  
}


module.exports = tiktokdl