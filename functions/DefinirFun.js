const fetch = require('node-fetch');

module.exports = async function DefinirFun(message, client) {
	const cond = (param) => !!param;

	async function toFetch(word) {
		const dicionario = await fetch(`https://significado.herokuapp.com/${word}`)
			.then(async (res) => {
				return res.json();
			})
			.then(async (data) => {
				return data;
			})
			.catch((err) => {
				return err;
			});
		return dicionario;
	}

	if (message.quotedMsg) {
		const word = message.quotedMsg.text;
		const dicionario = await toFetch(word);
		cond(dicionario);
		console.log(cond);
		await client.sendText(
			message.from,
			`${dicionario[0].class}\nSignificado: ${dicionario[0].meanings}\nEtimologia: ${dicionario[0].etymology}`,
		);
	} else {
		const word = message.text.substring(4);
		const dicionario = await toFetch(word);
		await client.sendText(
			message.from,
			`${dicionario[0].class}\nSignificado: ${dicionario[0].meanings}\nEtimologia: ${dicionario[0].etymology}`,
		);
	}
};
