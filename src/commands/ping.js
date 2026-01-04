const os = require("os");


module.exports = {
  name: "ping",
  async execute(ctx, isa) {
    try {
    const antes = Date.now();
    await ctx.reply("Pong🏓", {reply_to_message_id: ctx.message.message_id});
    const depois = Date.now();
    const res = depois - antes
    
    const infos = `→ Response: ${res}ms
→ System: ${os.platform()}
→ Ram: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}Gb`
    
    await ctx.replyWithPhoto("https://files.catbox.moe/c1zm1d.jpg", {caption: infos, reply_to_message_id: ctx.message.message_id});
      
      
    }
    catch(err) {
      const erros = ["Nossa... Ocorreu um maldito bug, vou botar meus dev pra trabaiar!", "AURA DESLIGA... Ocorreu um pequeno bug!", "Ih rapaiz quero trabaiar mais não, tô zoando porra, estou com ums probleminhas..."];
      
      const erroslet = erros[Math.floor(Math.random() * erros.length)];
      
      await ctx.reply(erroslet, {reply_to_message_id: ctx.message.message_id});
      console.error(err)
    }
    
    
  }
  
}