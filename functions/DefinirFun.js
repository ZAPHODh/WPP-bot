const fetch = require('node-fetch');



module.exports= async function DefinirFun(message){
    if(message.quotedMsg){
    }
    else{
        let word = message.text.substring(4);
        const objetoRetornado = await fetch(`https://significado.herokuapp.com/${word}`).then(async res=>{return res.json()}).then(async data=>{return data}).catch((err)=>{return err})
        
        return objetoRetornado
    }
    
}