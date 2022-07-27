const DefinirFun = require('./functions/DefinirFun')
const TraducaoFun= require('./functions/TraducaoFun')
const TotextFun = require('./functions/TotextFun')
const YTDFun =require('./functions/YTDFun')
const { create, Client, decryptMedia} = require('@open-wa/wa-automate');
const path = require('path')
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config()
const coin=process.env.XML ;
let ignore = []
let curso = false;


     
//onde tudo acontece
async function start(client = Client) {
    // const unreadMessages = await client.getAllUnreadMessages();
    // unreadMessages.forEach(processMessage)
   




    client.onIncomingCall(async call=>{
        await client.sendText(call.peerJid, 'Para de ligar ai o cuzao');
    });




    client.onAnyMessage(async message => {



        //Inicio da função de tradução
        if(message.text.includes("!tr") && message.quotedMsg !=null){
           await client.sendText(message.from, await  TraducaoFun(message));
        }
        //fim da  função de traduçò

        //inicio da função de definir
        if(message.text.includes("!def")){
              const dicionario = await   DefinirFun(message);
                await client.sendText(message.from,`${dicionario[0].class}\nSignificado: ${dicionario[0].meanings}\nEtimologia: ${dicionario[0].etymology}`)               
        }
        // fim da função de definir

        //inicio da função de mudar imagem pra texto
        if(message.text.includes("!totext") && message.quotedMsg !=null){
           let text = await  TotextFun(message)
           await client.sendText(message.from,text)
        }
        //fim da função de mudar imagem pra texto
        
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
            let pic = await  client.getProfilePicFromServer(message.from)
            await  client.sendImage(message.from,pic,pic,"ó como tu é lindo")
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
            const video = await  YTDFun(message);   
            video.on("finished",async  function(err, data) {
                try{
                    await client.sendFile(message.from,data.file)
                    fs.unlink(data.file,(err)=>{if(err)return err})
                }
                catch{await client.sendText(message.from,"video nao encontrado")}
            }) 
        }
        if (message.text.includes("!CP")) {
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
        }
        if(message.text.includes("!coin")) {
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
    })
}

create().then(client => start(client));