require('dotenv').config();

const scheduleCollector = require('./handleSchedule/handleAgendarCollector');
const sendOffer = require('../OfferHandler/index');
const attendantHandler = require('../AttendantHandler');

const Response = {
	Schedule: async (client, message) => {
		await scheduleCollector(client, message);
	},
	Place: async (client, message) => {
		await client.sendLocation(
			message.from,
			-22.759554355246195,
			-43.454976461120516,
			'Av. Dr. Mario Guimarães, 318 - Centro, Nova Iguaçu - RJ, 26255-230',
		);
	},
	Offer: async (client, message) => {
		await sendOffer(client, message);
	},
	Attendant: async (client, message) => {
		await attendantHandler(client, message);
	},
	Course: async (client, message) => {
		if (process.env.CURSO === 'TRUE')
			await client.sendText(message.from, 'Yup, we have a course for you');
		else {
			await client.sendText(message.from, 'There is no courses yet.');
		}
	},
};
module.exports = Response;
