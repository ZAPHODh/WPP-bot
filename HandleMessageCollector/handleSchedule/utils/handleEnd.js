const { handleIgnore } = require('../../utils/handleIgnore');
const questions = require('./questions');
const controlerSchedule = require('./controlerSchedule');
const { handleUsers } = require('../scheduledUsers/index');
const conversionHandler = require('../xlsxHandler/convertionHandler');

const handleEnd = async (data, client, message) => {
	handleIgnore('remove', message);

	const finished = [];
	if (data.size < questions.length) {
		await client.sendText(message.from, 'Você não respondeu todo o formulário');
	} else {
		await data.forEach((one) => finished.push(`${one.content.toLowerCase()}`));
		const response = await controlerSchedule(finished);
		if (response.valid.error) {
			await client.sendText(message.from, 'Voce não preencheu os dados corretamente');
		} else {
			handleUsers('add', response.user);
			await conversionHandler(client);
			await client.sendText(message.from, 'Agendado com sucesso');
		}
	}
};
module.exports = handleEnd;
