const mime = require('mime-types');

const { handleCourse } = require('./handleCourse');

const addCourse = async (client, message) => {
	const id = message.text.substring(10);
	const Course = handleCourse();
	const validate = Course.filter((o) => o.id === id);

	if (validate.length > 0) {
		await client.sendText(
			message.from,
			'Código de curso ja existente. Por favor, selecione outro.',
		);
	} else {
		if (message.mimetype) {
			const filename = `${message.t}.${mime.extension(message.mimetype)}`;
			const mediaData = await client.decryptMedia(message);
			const PDFBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`;
			const ObjImage = { id, filename, PDFBase64 };
			handleCourse('add', ObjImage);
		}
		await client.sendText(message.from, 'Curso adicionada com sucesso');
	}
};

module.exports = addCourse;
