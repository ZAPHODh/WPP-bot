const TraducaoFun= require("./functions/TraducaoFun")
const speech = require('@google-cloud/speech');
const { create, Client, decryptMedia,ParticipantChangedEventModel } = require('@open-wa/wa-automate');
const tesseract = require("node-tesseract-ocr")
const mime = require('mime-types');
const path = require('path')
const fs = require('fs');
const fetch = require('node-fetch');
const yt = require('youtube-search-without-api-key');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

require("dotenv").config()
const coin=process.env.XML ;
let ignore = []
let curso = false;
const speechClient = new speech.SpeechClient();

     
//onde tudo acontece
async function start(client = Client) {
    // const unreadMessages = await client.getAllUnreadMessages();
    // unreadMessages.forEach(processMessage)
   




    client.onIncomingCall(async call=>{
        await client.sendText(call.peerJid, 'Para de ligar ai o cuzão');
    });
    client.onAnyMessage(async message => {
        if(message.text.includes("!tr") && message.quotedMsg !=null){
           await client.sendText(message.from, await  TraducaoFun(message));
        }
        if(message.text.includes("!def")){
            if(message.quotedMsg){}
            else{
            let word = message.text.substring(4)
            fetch(`https://significado.herokuapp.com/${word}`).then(async res=>{
                return res.json()}).then(async data=>{
                    console.log(data)
                try{await client.sendText(message.from,`${data[0].class}\nSignifiado: ${data[0].meanings}\nEtimologia: ${data[0].etymology}`)}
                catch{await client.sendText(message.from,"palavra nao encontrada")}
            })
            }
        }
        if(message.text.includes("!totext") && message.quotedMsg !=null){

            // let lang = message.text.substring(8)

            const config = {

                
                oem: 3,
                psm: 3,
              }
            const filename = `${message.t}.${mime.extension(message.quotedMsg.mimetype)}`;
            const mediaData = await decryptMedia(message.quotedMsg);
            const imageBase64 = `data:${message.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            fs.writeFile(filename, mediaData, function(err) {
                if (err) {
                  return console.log(err);
                }
              });
           await tesseract.recognize(filename,config).then(async (text)=>{ await client.sendText(message.from,text)
            fs.unlink(filename,(err)=>{if(err){console.log(err)}})
        
        
        })
        }

        // if(message.text.includes("abobra" ) && message.quotedMsg != null){
            
            
        //     console.log(message)
        //     const filename = `${message.t}.${mime.extension(message.quotedMsg.mimetype)}`;
        //     const mediaData = await decryptMedia(message.quotedMsg);
        //     const mediaBase64 = `data:${message.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`

        //     fs.writeFile(filename, mediaData, function(err) {
        //         if (err) {
        //          return console.log(err);
        //         }
        //         console.log('The file was saved!');
        //     });


        //     const audio = {content:mediaBase64}

        //     const config = {
        //         encoding:'Base64',
        //         sampleRateHertz:48000,
        //         languageCode: "pt-BR"
        //     }
        //     const request ={
        //         audio:audio,
        //         config:config
        //     }
        //     const [response]= await speechClient.recognize(request)
        //     const transcription =response.results.alternatives[0].transcript
        //     await client.sendText(message.from,transcription)
        //     fs.unlink(filename,(err)=>{if(err){console.log(err)}})

        // }
        if(message.from == process.env.ATENDENTE && message.text.includes("Concluído")){
            ignore = ignore.filter(ignored = ignore != message.sender)  
            console.log(ignore);
            console.log("usuário excluído do ignore")
        }

        if(message.text.includes("!r")){
            if(message.quotedMsg == null){
                client.sendText(message.from,"Você não selecionou alguém para banir")
            }
            else{
                await  client.removeParticipant(message.chat.groupMetadata.id,message.quotedMsg.author) 
            }
        }

        if(message.text == "arroz" && message.sender.profilePicThumbObj.imgFull !=null){
            console.log(message)
            console.log(message.sender.profilePicThumbObj);
            await  client.sendImage(message.from,message.sender.profilePicThumbObj.imgFull,message.sender.profilePicThumbObj.imgFull,"ó sua foto",message.from)
        }

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
            const question = [' Tudo bem? Sou o assistente virtual do salão MAURO CHRISOSTISMO. Selecione uma das opçoes:\n1.Agendar\n2.Local\n3.Promoçoes\n4.Serviços\n5.Falar com o atendente\n6.Curso'];
            const filter = m => m.from === message.from;
            const collector = client.createMessageCollector(message.from, filter,{
                max: 10,
                time: 1000 *60 //15 secs
            } )
            if (ignore.includes(message.from)) {}
            else{
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
                            case "2" || "Local"|| "local" :            
                                RES.LOCAL(); //envia a localização
                                collector.stop((msg)=>{return msg})           
                                break;
                            case "3"  :
                                RES.PROMO()// Envia as promocoes 
                                collector.stop((msg)=>{return msg});                     
                                break;
                            case "4"  :
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})                    
                                break;
                            case  "5" :                     
                                RES.ATEND() // resposta do atendimento
                                ignore.push(message.from);
                                setTimeout(()=>{ignore = ignore.filter(id => id !== message.from)},1000 * 15 * 60 )
                                console.log(ignore)                             
                                return;
                            case "6":

                            default:
                                // await client.sendText(message.from,`opção inválida`);
                                // // collector.stop((msg)=>{return msg})
                                // break;
                            }
                        }
                    })
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
                    "outputPath":"D:/WPP",    
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
        if (message.body.includes("!CP")) {
            let valor = message.body.substring(4).toUpperCase();
            const BRL = "BRL"
            const filter = m=> m.from == message.from
            const collectorCoin = client.createMessageCollector(message.from,filter,{time:1000 *60,
            max:1
            })
            client.sendText(message.from, "agora diga o período")
            collectorCoin.on("collect",async (periodo)=>{
                if (periodo){
                    let primary = periodo.text.substring(0,8)
                    let secondary = periodo.text.substring(9)
                    try{
                        fetch(`https://economia.awesomeapi.com.br/json/daily/${valor}-BRL/?start_date=${primary}&end_date=${secondary}`).then(res => { return res.json() }).then(async data =>{
                        console.log(data)
                        await client.sendText(message.from,"Alta:"+data[0].high + "\nBaixa:"+data[0].low)})
                    }
                    catch{
                        await client.sendText(message.from, "Moeda não encontrada, Moedas disponíveis:" + coin)
                    }
                }
            })
            if(message.body.includes("!coin")) {
                let valor = message.body.substring(6).toUpperCase();
                const BRL = "BRL"
                fetch(`https://economia.awesomeapi.com.br/last/${valor}-BRL`).then(res => { return res.json() }).then(async data =>{
                    const sub = valor+BRL; 
                    try{
                        await client.sendText(message.from, "Cotação atual: " +data[sub].bid)}
                    catch{
                        await client.sendText(message.from, "Moeda não encontrada, Moedas disponíveis:" + coin)
                    }
                });
            }
        }
    });
}

create().then(client => start(client));