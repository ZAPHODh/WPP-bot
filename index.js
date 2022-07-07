const { create, Client, decryptMedia, timePromise } = require('@open-wa/wa-automate');
const mime = require('mime-types');
const path = require('path')
const fs = require('fs');
const fetch = require('node-fetch');
require("dotenv").config()






function start(client = Client) {


    client.onAnyMessage(async message => {

    


        if (message.text == "!test") {
            const RES = {
                LOCAL: async function local(){
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
                    await client.sendText(ATENDENTE,"Solicitou atendimento")
                }      
            }
            const question = [' Tudo bem? Sou o assistente virtual do salão MAURO CHRISOSTISMO. Selecione uma das opçoes:\n1.Agendar\n2.Local\n3.Promoçoes\n4.Serviços\n5.Falar com o atendente'];
            const filter = m => m.from === message.from;
            const collector = client.createMessageCollector(message.from, filter,{
                max: 10,
                time: 1000 *60 //15 secs
            } )
            await client.sendText(message.from, `Olá,${message.notifyName}. ${question[0]}`);

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
                               
                                // collector.stop((msg)=>{return msg})                                 
                                break;
                            case  "Atendimento" :
                                RES.ATEND() // resposta do atendimento               
                                break;
                            default:
                                // await client.sendText(message.from,`opção inválida`);
                                // // collector.stop((msg)=>{return msg})
                                // break;
                        }
                    }
            })
        }
    })

    client.onAnyMessage(async message => {
        if (message.caption == "Figurinha" || message.caption == "Sticker") {
            const mediaData = await decryptMedia(message);
            const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
                'base64'
            )}`;

            await client.sendImageAsSticker(
                message.from,
                imageBase64,

            )
        }
        // fs.writeFile(filename, mediaData, function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log('The file was saved!');
        // });
        // if (message.body == `!coin USD`) {
        //     let valor = message.body.substring(6);
        //     console.log(valor)
            
        //     fetch(`https://economia.awesomeapi.com.br/last/${valor}-BRL`).then(res => { return res.json() }).then(async data => await client.sendText(message.from, "Cotação atual: " + data.USDBRL.bid));
        // }
    });
}

create().then(client => start(client));