const { create, Client } = require('@open-wa/wa-automate');

const addOffer = require('./OfferHandler/addOffer');
const removeOffer = require('./OfferHandler/removeOffer');
const { handleUnreadMessages } = require('./handleUnreadMessages');
const HandleMessageCollector = require('./HandleMessageCollector');

const scheduleReminder = require('./handleDates/scheduleReminder');
const addCourse = require('./CourseHandler/addCourse');
const removeCourse = require('./CourseHandler/removeCourse');
const { handleIgnore } = require('./HandleMessageCollector/utils/handleIgnore');
const removePreviousDay = require('./handleDates/removePreviousDay');
const endAttend = require('./AttendantHandler/endAttend');

require('dotenv').config();

// onde tudo acontece
async function start(client = Client) {
	const unreadMessages = await client.getAllUnreadMessages();
	handleUnreadMessages(unreadMessages);
	// day-by-day reminder scheduled persons
	setInterval(async () => {
		await scheduleReminder(client);
		removePreviousDay();
	}, 1000 * 60 * 60 * 24);

	client.onIncomingCall(async (call) => {
		await client.sendText(call.peerJid, 'não posso te atender');
	});

	client.onAnyMessage(async (message) => {
		const ignore = handleIgnore();
		if (!ignore.includes(message.from)) {
			if (message.text.includes('ATENDIMENTO ENCERRADO')) {
				await endAttend(client, message);
			} else if (message.text.includes('!addOffer')) {
				await addOffer(client, message);
			} else if (message.text.includes('!removeOffer')) {
				removeOffer(client, message);
			} else if (message.text.includes('!addCourse')) {
				await addCourse(client, message);
			} else if (message.text.includes('!removeCourse')) {
				await removeCourse(client, message);
			} else if (message) {
				await HandleMessageCollector(client, message);
			}
		}
	});
}

create({
	licenseKey: process.env.KEY,
	cacheEnabled: false,
}).then((client) => start(client));
