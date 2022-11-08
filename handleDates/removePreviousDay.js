const { handleUsers } = require('../HandleMessageCollector/handleSchedule/scheduledUsers/index');

const removePreviousDay = () => {
	const user = handleUsers();
	const yesterday = new Date(new Date(Date.now()).setHours(-24, 0, 0)).toLocaleDateString(
		'pt-BR',
	);
	const yesterdayFiltered = user.filter((matchDate) => matchDate.date === yesterday);
	if (yesterdayFiltered.length > 0) {
		yesterdayFiltered.map(async (toBeRemoved) => {
			handleUsers('remove', toBeRemoved);
		});
	}
};
module.exports = removePreviousDay;
