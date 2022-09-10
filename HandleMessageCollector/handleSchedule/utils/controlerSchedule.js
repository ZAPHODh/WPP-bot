const validatorSchema = require('./scheduleSchema');

const controlerSchedule = async (data) => {
	const user = {
		name: data[0],
		date: data[1],
		professional: data[2],
		service: data[3],
	};
	const valid = await validatorSchema(user);
	return { valid, user };
};
module.exports = controlerSchedule;
