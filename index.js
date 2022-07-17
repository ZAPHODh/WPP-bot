const { create, Client, decryptMedia } = require('@open-wa/wa-automate');
const mime = require('mime-types');
const path = require('path')
const fs = require('fs');
const fetch = require('node-fetch');
const yt = require('youtube-search-without-api-key');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const parseString = require('xml2js').parseString;
require("dotenv").config()
let  coin =process.env.XML ;
let ignore = []
let state = 1; //state 1 significa ativo, ele irá coletar a mensagem. state 0 significa que irá ignorar as mensagens



//onde tudo acontece
function start(client = Client) {
    

    client.onAnyMessage(async message => {
        if (message.text == "!test") {
            
            const RES = {
                LOCAL: async function local (){
                    await client.sendLocation(message.from,-22.759554355246195, -43.454976461120516, "Av. Dr. Mario Guimarães, 318 - Centro, Nova Iguaçu - RJ, 26255-230")},
                PROMO: async function promo(){
                    await client.sendImage(message.from,path.join(__dirname,"./PROMO/promo1.jpg"))
                    await client.sendImage(message.from,path.join(__dirname,"./PROMO/promo2.jpg"))
                    await client.sendImage(message.from,path.join(__dirname,"./PROMO/promo3.jpg"))
                    await client.sendImage(message.from,path.join(__dirname,"./PROMO/promo4.jpg")) },
                ATEND: async function atend(){
                    await client.sendContact(process.env.ATENDENTE,message.from,);
                    await client.sendText(message.from,"Tudo bem, sua mensagem foi enviada para um de nossos atendentes.")
                    await client.sendText(message.from,"Em instantes iremos atendê-lo")
                    await client.sendText(process.env.ATENDENTE,"Solicitou atendimento")
                }      
            }
            const question = [' Tudo bem? Sou o assistente virtual do salão MAURO CHRISOSTISMO. Selecione uma das opçoes:\n1.Agendar\n2.Local\n3.Promoçoes\n4.Serviços\n5.Falar com o atendente'];
            const filter = m => m.from === message.from;
            const collector = client.createMessageCollector(message.from, filter,{
                max: 10,
                time: 1000 *60 //15 secs
            } )
            if (ignore.includes(message.from)) {}
            else{
            if(state == 1){
            await client.sendText(message.from, `Olá, ${message.notifyName}. ${question[0]}`);

            collector.on('collect', 
                async (m) =>{
                    if (m) {
                        const mensagem= m.content
                        switch (mensagem) {
                            case "1" :          
                                await client.sendText(message.from, "Em construção")
                                collector.stop((msg)=>{return msg})          
                                break;
                            case "Agendar":               
                                await client.sendText(message.from, "Em construção")
                                collector.stop((msg)=>{return msg})              
                                break;
                            case "agendar":        
                                await client.sendText(message.from, "Em construção")
                                collector.stop((msg)=>{return msg})             
                                break;
                            case "2" || "Local"|| "local" :            
                                RES.LOCAL(); //envia a localização
                                collector.stop((msg)=>{return msg})           
                                break;
                            case  "Local" :          
                                RES.LOCAL();//envia a localização
                                collector.stop((msg)=>{return msg})                  
                                break;
                            case "local" :           
                                RES.LOCAL();//envia a localização
                                collector.stop((msg)=>{return msg})                
                                break; 
                            case "3"  :
                                RES.PROMO()// Envia as promocoes 
                                collector.stop((msg)=>{return msg});                     
                                break;
                            case  "Promoções" :
                                RES.PROMO()// Envia as promocoes 
                                collector.stop((msg)=>{return msg})  
                                break;
                            case "promoções"  :
                                RES.PROMO()// Envia as promocoes 
                                collector.stop((msg)=>{return msg})                      
                                break;
                            case  "Promocoes"  :                                
                                RES.PROMO()// Envia as promocoes 
                                collector.stop((msg)=>{return msg})  
                                break;
                            case "promocoes" :
                                RES.PROMO()// Envia as promocoes
                                collector.stop((msg)=>{return msg})  
                                break;
                            case "4"  :
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})                    
                                break;
                            case  "Serviços"  :
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})                     
                                break;
                            case  "serviços"  :                     
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})                     
                                break;
                            case  "Servicos"  :             
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})                 
                                break;
                            case  "servicos" :          
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})            
                                break;
                            case  "5" :                     
                                RES.ATEND() // resposta do atendimento
                                ignore.push(message.from);
                                setTimeout(()=>{ignore = ignore.filter(id => id !== message.from)},1000 * 15 )
                                console.log(ignore)                             
                                return;
                            case  "Atendimento" :
                                RES.ATEND()
                                ignore.push(message.from)
                                setTimeout(ignore = ignore.filter(id => id !== message.from),1000 * 15 )
                                console.log(ignore)
                                // resposta do atendimento
                                return;
                            default:
                                // await client.sendText(message.from,`opção inválida`);
                                // // collector.stop((msg)=>{return msg})
                                // break;
                        }
                    }
            })
        }
    }
}
    })

    client.onAnyMessage(async message => {
        if (message.text == "Figurinha" || message.text == "Sticker") {
            const mediaData = await decryptMedia(message);
            const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
                'base64'
            )}`;

            await client.sendImageAsSticker(
                message.from,
                imageBase64,

            )
        }
        if(message.text.charAt(0)== "!" && message.text.charAt(1)== "y" && message.text.charAt(2)== "t"){
            let content = message.text.substring(3)
            const video = await yt.search(content).catch(err=> err);
                let YD =  new YoutubeMp3Downloader({
                    "ffmpegPath": "C:/PATH_Programs/ffmpeg",       
                    "outputPath": path.join(__dirname),    
                    "youtubeVideoQuality": "highestaudio",  
                    "queueParallelism": 2,                  
                    "progressTimeout": 2000,                
                    "allowWebm": false
                })
            try{YD.download(video[0].url.substring(32))}
            catch{ client.sendText(message.from,"vídeo não encontrado")}
            YD.on("finished",async  function(err, data) {
                    
                try{await  client.sendFile(message.from, data.file)
                    await client.sendText(message.from,data.videoTitle)        
                }
                catch{ await client.sendText(message.from, "Vídeo grande demais")}
                fs.unlink(data.file,(err)=>{if(err){console.log(err)}})
            }) 
    }
        // fs.writeFile(filename, mediaData, function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log('The file was saved!');
        // });
        if (message.body.includes("!coin")) {
            let valor = message.body.substring(6).toUpperCase();
            const BRL = "BRL"
           
            console.log(valor+BRL)
            
            fetch(`https://economia.awesomeapi.com.br/last/${valor}-BRL`).then(res => { return res.json() }).then(async data =>{
                const sub = valor+BRL; 
                try{await client.sendText(message.from, "Cotação atual: " +data[sub].bid)}
                catch{
                    await client.sendText(message.from, "Moeda não encontrada, Moedas disponíveis:" + coin)
            }
            });
        }
});
}

create().then(client => start(client));