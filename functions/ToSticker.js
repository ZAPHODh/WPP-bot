const { decryptMedia } = require('@open-wa/wa-automate');

module.exports = async function ToSticker(message, client) {
	if (message.mimetype == null) {
		await client.sendText(message.from, 'Nenhuma imagem encontrada');
	}
	const mediaData = await decryptMedia(message);
	const fileBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`;
	if (message.type === 'video') {
		await client.sendMp4AsSticker(message.from, fileBase64);
	}
	if (message.type === 'image') await client.sendImageAsSticker(message.from, fileBase64);
};
