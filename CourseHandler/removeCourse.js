const { handleCourse } = require('./handleCourse');

const removeCourse = async (client, message) => {
	const Course = handleCourse();
	const id = message.text.substring(13);
	const validate = Course.filter((o) => o.id === id);
	if (validate.length > 0) {
		handleCourse('remove', id);
		client.sendText(message.from, 'Curso removido com sucesso');
	} else if (Course.length > 0) {
		await client.sendText(
			message.from,
			'Identificador não encontrado. Aqui estão os cursos disponíveis:',
		);
		Course.map(async (o) => {
			await client.sendImage(message.from, o.mediaData, o.filename, o.id);
		});
	} else {
		await client.sendText(message.from, 'Não exisem cursos ativos.');
	}
};
module.exports = removeCourse;
