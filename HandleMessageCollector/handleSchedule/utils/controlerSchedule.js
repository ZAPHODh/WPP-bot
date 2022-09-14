const validatorSchema = require('./scheduleSchema');

const controlerSchedule = async (data) => {
	const user = {
		id: data[0],
		name: data[1],
		professional: data[2],
		date: data[3],
		hour: data[4],
		service: data[5],
	};
	const valid = await validatorSchema(user);
	return { valid, user };
};
module.exports = controlerSchedule;
