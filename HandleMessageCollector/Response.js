require('dotenv').config();

const AgendarCollector = require('./handleSchedule/handleAgendarCollector');

const Response = {
	AGENDAR: async (client, message) => {
		await AgendarCollector(client, message);
	},
	LOCAL: async (client, message) => {
		await client.sendLocation(
			message.from,
			-22.759554355246195,
			-43.454976461120516,
			'Av. Dr. Mario Guimarães, 318 - Centro, Nova Iguaçu - RJ, 26255-230',
		);
	},
	PROMO: async (client, message) => {
		await client.sendText(message.from, 'There is no promos yet');
	},
	ATEND: async (client, message) => {
		await client.sendContact(process.env.ATENDENTE, message.from);
		await client.sendText(process.env.ATENDENTE, 'Solicitou atendimento');
		await client.sendText(
			message.from,
			'Tudo bem, sua mensagem foi enviada para um de nossos atendentes.',
		);
		await client.sendText(message.from, 'Em instantes iremos atendê-lo');
	},
	CURSO: async (client, message) => {
		if (process.env.CURSO === 'TRUE')
			await client.sendText(message.from, 'Yup, we have a course for you');
		else {
			await client.sendText(message.from, 'There is no courses yet.');
		}
	},
};
module.exports = Response;
