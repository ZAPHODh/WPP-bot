// eslint-disable-next-line import/no-extraneous-dependencies
const mime = require('mime-types');
const tesseract = require('node-tesseract-ocr');
const { decryptMedia } = require('@open-wa/wa-automate');
const fs = require('fs');

module.exports = async function TotextFun(message, client) {
	const filename = `${message.t}.${mime.extension(message.quotedMsg.mimetype)}`;
	const mediaData = await decryptMedia(message.quotedMsg);
	fs.writeFile(filename, mediaData, function (err) {
		if (err) {
			return console.log(err);
		}
	});
	const config = {
		// lang: "PT-br",
		oem: 3,
		psm: 3,
	};
	const text = await tesseract.recognize(filename, config).then(async (text) => {
		return text;
	});
	await client.sendText(message.from, text);
	fs.unlink(filename, (err) => {
		if (err) console.log(err);
	});
};
