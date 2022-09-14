const { handleUsers } = require('../HandleMessageCollector/handleSchedule/scheduledUsers/index');

const scheduleReminder = async (client) => {
	const user = handleUsers();
	const today = Date.now();
	const tomorrow = new Date(today).setHours(24, 0, 0);
	const to_pt_BR = new Date(tomorrow).toLocaleDateString('pt-BR');
	const userFiltered = user.filter((matchDate) => matchDate.date === to_pt_BR);
	userFiltered.map(async (scheduledForTomorrow) => {
		await client.sendText(
			scheduledForTomorrow.id,
			`Olá,${scheduledForTomorrow.name}. Você possui um agendamento conosco para amanhã as ${scheduledForTomorrow.hour} horas. Te espero aqui amanhã `,
		);
	});
};

module.exports = scheduleReminder;
