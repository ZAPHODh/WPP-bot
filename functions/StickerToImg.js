/* eslint-disable import/no-extraneous-dependencies */
const mime = require('mime-types');
const { decryptMedia } = require('@open-wa/wa-automate');

module.exports = async function StickerToImg(message, client) {
	console.log(message.quotedMsg);
	if (message.quotedMsg === 'null') {
		await client.sendText(message.from, 'Nenhuma figurinha selecionada');
	}
	const filename = `${message.t}.${mime.extension(message.quotedMsg.mimetype)}`;
	const mediaData = await decryptMedia(message.quotedMsg);
	const imageBase64 = `data:${message.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
	await client.sendImage(message.from, imageBase64, filename, `Tome`);
};
