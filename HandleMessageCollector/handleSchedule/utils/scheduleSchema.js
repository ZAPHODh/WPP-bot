/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

const validatorSchema = async (data) => {
	const schema = Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required(),
		professional: Joi.string()
			.required()
			.valid(
				'mauro',
				'marcos barros',
				'ariane',
				'rodrigo',
				'glaucio',
				'maicon',
				'graziele',
				'ana katia',
				'katia',
				'gisele',
				'ana lucia',
				'patricia',
			),
		date: Joi.string()
			.pattern(
				new RegExp(
					/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
				),
			)
			.required(),
		hour: Joi.string()
			.pattern(new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/))
			.required(),
		service: Joi.string().required(),
	});

	return schema.validate(data);
};
module.exports = validatorSchema;
