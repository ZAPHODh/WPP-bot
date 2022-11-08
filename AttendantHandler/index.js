const attendantHandler = async (client, message) => {
	const hour = new Date(Date.now()).getHours();
	const day = new Date(Date.now()).getDay;
	if (day === 0 && day === 1) {
		await client.sendText(
			message.from,
			'Não funcionamos na segunda e domingos. Por favor, volte outro dia',
		);
		return;
	}
	if (hour >= 9 && hour < 19) {
		await client.sendContact(process.env.ATENDENTE, message.from);
		await client.sendText(process.env.ATENDENTE, 'Solicitou atendimento');
		await client.sendText(
			message.from,
			'Tudo bem, sua mensagem foi enviada para um de nossos atendentes.',
		);
		await client.sendText(message.from, 'Em instantes iremos atendê-lo');
	} else {
		await client.sendText(
			message.from,
			'Nosso atendimento funciona das 09:00 as 19:00. Por favor, retorne entre esses horários',
		);
	}
};
module.exports = attendantHandler;
