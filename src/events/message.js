const spotify = require("../utils/spotify");
const tiktokdl = require("../utils/tiktok");

module.exports = (isa) => {
  
  isa.on('message', async(ctx) => {
    console.log(ctx)
    const msg = ctx?.message?.text
    
    const sticker = ctx?.message?.sticker
    
    console.log(sticker);
    
    if(!msg) return;
    
    if(msg.includes("https://vt.tiktok.com")) {
      
      tiktokdl(ctx)
      
    }
    
    if(msg.includes("https://open.spotify.com/track")) {
      spotify(ctx);
      
    }
    
    
    
  });
  
  
  
  
  
}