const { handleUsers } = require('../HandleMessageCollector/handleSchedule/scheduledUsers/index');

const scheduleReminder = async (client) => {
	const user = handleUsers();
	const tomorrow = new Date(new Date(Date.now()).setHours(24, 0, 0)).toLocaleDateString('pt-BR');

	const tomorrowFiltered = user.filter((matchDate) => matchDate.date === tomorrow);
	tomorrowFiltered.map(async (scheduledForTomorrow) => {
		await client.sendText(
			scheduledForTomorrow.id,
			`Olá, ${scheduledForTomorrow.name}. Você possui um agendamento conosco para amanhã as ${scheduledForTomorrow.hour} horas. Te espero aqui amanhã `,
		);
	});
};

module.exports = scheduleReminder;
