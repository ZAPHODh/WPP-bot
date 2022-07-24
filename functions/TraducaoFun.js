
const translate = require('@vitalets/google-translate-api');


module.exports = async function TraducaoFun(message){
let language = message.text.substring(4);
let text = message.quotedMsg.content;          
try{
    const res =await translate(text,{to:language});
   return res.text
}
catch{
    return "Linguagem não encontrada";
}
}


