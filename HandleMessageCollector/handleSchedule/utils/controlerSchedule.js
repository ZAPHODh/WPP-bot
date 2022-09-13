const validatorSchema = require('./scheduleSchema');

const controlerSchedule = async (data) => {
	const user = {
		name: data[0],
		professional: data[1],
		date: data[2],
		hour: data[3],
		service: data[4],
	};
	const valid = await validatorSchema(user);
	return { valid, user };
};
module.exports = controlerSchedule;
