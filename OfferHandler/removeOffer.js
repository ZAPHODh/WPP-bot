const { handleOffer } = require('./handleOffer');

const removeOffer = async (client, message) => {
	const Offer = handleOffer();
	const id = message.text.substring(13);
	const validate = Offer.filter((o) => o.id === id);
	if (validate.length > 0) {
		handleOffer('remove', id);
		client.sendText(message.from, 'Promoção removida com sucesso');
	} else if (Offer.length > 0) {
		await client.sendText(
			message.from,
			'Identificador não encontrado. Aqui estão as promoções disponíveis:',
		);
		Offer.map(async (o) => {
			await client.sendImage(message.from, o.mediaData, o.filename, o.id);
		});
	} else {
		await client.sendText(message.from, 'Não exisem promoções ativas.');
	}
};
module.exports = removeOffer;
