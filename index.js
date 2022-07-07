const { create, Client, decryptMedia, timePromise } = require('@open-wa/wa-automate');
const mime = require('mime-types');
const path = require('path')
const fs = require('fs');
const fetch = require('node-fetch');
const { MessageCollector } = require('@open-wa/wa-automate/dist/structures/MessageCollector');
const { setMaxListeners } = require('events');
const { Session } = require('inspector');
const ATENDENTE = '5521971083900@c.us';

let calling = false;


function start(client = Client) {


    client.onAnyMessage(async message => {
        if (message.text == "!test") {
            console.log(message)
            const questions = [' Tudo bem? Sou o assistente virtual do salão MAURO CHRISOSTISMO. Selecione uma das opçoes:\n1.Agendar\n2.Local\n3.Profissionais\n4.Promoçoes\n5.Serviços\n6.Falar com o atendente'];
            let counter = 0;
            const filter = m => m.from === message.from;
            const collector = client.createMessageCollector(message.from, filter,{
                max: 10,
                time: 1000 *60 //15 secs
            } )
            await client.sendText(message.from, `Olá,${message.notifyName}. ${questions[counter++]}`);

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
                                await client.sendLocation(message.from,-22.759554355246195, -43.454976461120516, "Av. Dr. Mario Guimarães, 318 - Centro, Nova Iguaçu - RJ, 26255-230")
                                collector.stop((msg)=>{return msg})           
                                break;
                            case  "Local" :          
                                await client.sendLocation(message.from,-22.759554355246195, -43.454976461120516, "Av. Dr. Mario Guimarães, 318 - Centro, Nova Iguaçu - RJ, 26255-230")
                                collector.stop((msg)=>{return msg})                  
                                break;
                            case "local" :           
                                await client.sendLocation(message.from,-22.759554355246195, -43.454976461120516, "Av. Dr. Mario Guimarães, 318 - Centro, Nova Iguaçu - RJ, 26255-230")
                                collector.stop((msg)=>{return msg})                
                                break;
                            case "3" :                 
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})             
                                break;
                            case "Profissionais"  :             
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})              
                                break; 
                            case  "profissionais" :                    
                                await client.sendText (message.from,"Em construção")
                                collector.stop((msg)=>{return msg})                         
                                break;  
                            case "4"  :
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo1.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo2.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo3.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo4.jpg"))
                                collector.stop((msg)=>{return msg})                       
                                break;
                            case  "Promoções" :
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo1.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo2.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo3.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo4.jpg"))
                                collector.stop((msg)=>{return msg})  
                                break;
                            case "promoções"  :
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo1.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo2.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo3.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo4.jpg"))
                                collector.stop((msg)=>{return msg})                      
                                break;
                            case  "Promocoes"  :                                
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo1.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo2.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo3.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo4.jpg"))
                                collector.stop((msg)=>{return msg})  
                                break;
                            case "promocoes" :
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo1.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo2.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo3.jpg"))
                                await client.sendImage(message.from,path.join(__dirname,"./promotions/promo4.jpg"))
                                collector.stop((msg)=>{return msg})  
                                break;
                            case "5"  :
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
                            case  "6" :                       
                                await client.sendContact(ATENDENTE,message.from,);
                                await client.sendText(message.from,"Tudo bem, sua mensagem foi enviada para um de nossos atendentes.")
                                await client.sendText(message.from,"Em instantes iremos atendê-lo")
                                await client.sendText(ATENDENTE,"Solicitou atendimento")
                               
                                // collector.stop((msg)=>{return msg})                                 
                                break;
                            case  "Atendimento" :
                                await client.sendContact(ATENDENTE,message.from,);
                                await client.sendText(message.from,"Tudo bem, sua mensagem foi enviada para um de nossos atendentes.")
                                await client.sendText(message.from,"Em instantes iremos atendê-lo")
                                await client.sendText(ATENDENTE,"Solicitou atendimento")
                                collector.dispose(message => message)                     
                                break;
                            default:
                                await client.sendText(message.from,`opção inválida`);
                                // collector.stop((msg)=>{return msg})
                                break;
                        }
                    }
            })
            collector.on('end', async messagesCollected => {
                if (messagesCollected.size < questions.length - 1) {
                    client.sendText(message.from, "Tempo excedido. Não houve uma resposta a tempo e por isso, estarei encerrando a cessão.")
                }
                if (messagesCollected.siza == questions.length - 1) {
                    messagesCollected.forEach(async (messages) => {
                        let counter = 0
                        client.sendText(message.from, questions[counter++] + messages.content)
                    });
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