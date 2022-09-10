const Response = require('./Response');
const b64ify = require('./handleSchedule/utils/b64ify');
const { handleIgnore } = require('./utils/handleIgnore');
const options = require('./handleSchedule/utils/optionsSchedule');

const HandleMessageCollector = async (client, message) => {
	const ignore = handleIgnore();
	const filter = (m) => m.from === message.from && !ignore.includes(message.from);
	const collector = client.createMessageCollector(message.from, filter, {
		max: 10,
		time: 1000 * 60,
	});
	if (!ignore.includes(message.from)) {
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
	}
	await collector.on('collect', async (m) => {
		if (m) {
			const mensagem = m.content;
			switch (mensagem) {
				case 'Agendar':
					await Response.AGENDAR(client, message);
					return;
				case 'Local':
					await Response.LOCAL(client, message); // envia a localização
					collector.stop((msg) => {
						return msg;
					});
					return;
				case 'Promoçoes':
					Response.PROMO(client, message); // Envia as promocoes
					collector.stop((msg) => {
						return msg;
					});
					return;
				case 'Serviços':
					await client.sendText(message.from, 'Em construção');
					collector.stop((msg) => {
						return msg;
					});
					return;
				case 'Falar com o atendente':
					Response.ATEND(client, message); // Responseposta do atendimento
					return;
				case 'Curso':
				default:
					await client.sendText(message.from, `opção inválida`);
					collector.stop((msg) => {
						return msg;
					});
			}
		}
	});
	await collector.on('end', () => {});
};
module.exports = HandleMessageCollector;
