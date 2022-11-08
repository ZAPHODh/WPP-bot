const { handleCourse } = require('./handleCourse');

const sendCourse = async (client, message) => {
	const Course = handleCourse();
	if (Course.length === 0) {
		await client.sendText(message.from, 'Não há cursos disponíveis');
	} else {
		Course.map(async (o) => {
			await client.sendFile(message.from, o.PDFBase64, o.filename);
		});
	}
};

module.exports = sendCourse;
