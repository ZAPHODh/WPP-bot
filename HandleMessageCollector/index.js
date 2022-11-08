const Response = require('./Response');
const b64ify = require('./handleSchedule/utils/b64ify');
const { handleIgnore } = require('./utils/handleIgnore');
const options = require('./handleSchedule/utils/optionsSchedule');
const sendCourse = require('../CourseHandler');

const HandleMessageCollector = async (client, message) => {
	const ignore = handleIgnore();
	const filter = (m) => m.from === message.from;
	const collector = client.createMessageCollector(message.from, filter, {
		max: 1,
		time: 1000 * 60,
	});
	if (!ignore.includes(message.from)) {
		handleIgnore('add', message);
		await client.sendListMessage(
			message.from,
			[
				{
					title: 'Escolha o que deseja',
					rows: options.map((option) => ({
						title: option,
						rowId: b64ify({ option }),
					})),
				},
			],
			`Olá, ${message.sender.pushname}. Tudo bem? Sou o assistente virtual do salão MAURO CHRISOSTISMO. `,
			'Selecione uma das opções',
			'Opções',
		);

		await collector.on('collect', async (m) => {
			if (m) {
				const mensagem = m.content;
				switch (mensagem) {
					case 'Agendar':
						await Response.Schedule(client, message);
						collector.stop();
						return;
					case 'Local':
						await Response.Place(client, message); // envia a localização
						collector.stop();
						handleIgnore('remove', message.from);
						return;
					case 'Promoçoes':
						await Response.Offer(client, message); // Envia as promocoes
						collector.stop();
						handleIgnore('remove', message.from);
						return;
					case 'Falar com o atendente':
						await Response.Attendant(client, message);
						collector.stop(); // Responseposta do atendimento
						handleIgnore('remove', message.from);
						return;
					case 'Curso':
						await sendCourse(client, message);
						handleIgnore('remove', message.from);
						return;
					default:
						await client.sendText(message.from, `opção inválida`);
						collector.stop((msg) => {
							return msg;
						});
						handleIgnore('remove', message.from);
				}
			}
		});
	}
	await collector.on('end', (msg) => {
		if (msg.size === 0) {
			client.sendText(message.from, 'Você não respondeu nada. Encerrando a aplicação');
			handleIgnore('remove', message.from);
		}
	});
};
module.exports = HandleMessageCollector;
