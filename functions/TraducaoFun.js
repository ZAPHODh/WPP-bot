const translate = require('@vitalets/google-translate-api');

module.exports = async function TraducaoFun(message, client) {
	const language = message.text.substring(4);
	const text = message.quotedMsg.content;
	try {
		const res = await translate(text, { to: language });
		await client.sendText(message.from, res.text);
	} catch {
		await client.sendText(message.from, 'Linguagem não reconhecida');
	}
};
