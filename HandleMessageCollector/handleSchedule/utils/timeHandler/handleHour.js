const { handleUsers } = require('../../scheduledUsers/index');

const handleHour = async (date, prof) => {
	const professional = prof.toLowerCase();
	const users = handleUsers();
	const userDate = users.filter(
		(user) => user.date === date && user.professional === professional,
	);
	const day = date.charAt(0) + date.charAt(1);
	const month = date.charAt(3) + date.charAt(4);
	const updatedDate = `${month}/${day}/${date.substring(6)}`;
	let time = 30;
	const Day = new Date(updatedDate).setHours(8);
	const Hours = [];
	for (let i = 0; i < 19; i++) {
		const nextHour = new Date(new Date(Day).setMinutes((time += 30), 0)).toLocaleTimeString(
			'pt-BR',
			{ hour: '2-digit', minute: '2-digit' },
		);
		Hours.push(nextHour);
	}
	if (userDate.length > 0) {
		const hoursToRemove = userDate.map(({ hour }) => hour);
		const updatedHours = Hours.filter((h) => !hoursToRemove.includes(h));
		return updatedHours;
	}
	return Hours;
};
module.exports = handleHour;
