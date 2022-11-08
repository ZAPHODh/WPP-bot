const Joi = require('joi');

const validatorId = async (data) => {
	const schema = Joi.string().pattern(/^[0-9]{3}$/);
	return schema.validate(data);
};
module.exports = validatorId;
