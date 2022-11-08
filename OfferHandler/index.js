const { handleOffer } = require('./handleOffer');

const sendOffer = async (client, message) => {
	const Offer = handleOffer();
	if (Offer.length === 0) {
		await client.sendText(message.from, 'Não há promoções disponíveis');
	} else {
		Offer.map(async (o) => {
			await client.sendImage(message.from, o.mediaData, o.filename);
		});
	}
};

module.exports = sendOffer;
