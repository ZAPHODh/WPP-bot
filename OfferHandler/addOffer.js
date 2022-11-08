const mime = require('mime-types');

const { handleOffer } = require('./handleOffer');
const validatorId = require('./validateId');

const addOffer = async (client, message) => {
	const id = message.text.substring(10);
	const Offer = handleOffer();
	const validate = Offer.filter((o) => o.id === id);
	const validateID = await validatorId(id);

	if (validate.length > 0) {
		await client.sendText(
			message.from,
			'Código de promoção ja existente. Por favor, selecione outro.',
		);
	} else if (validateID.error) {
		await client.sendText(
			message.from,
			'Id inválido. O Id precisa ser um número de 3 dígitos.',
		);
	} else {
		if (message.mimetype) {
			const filename = `${message.t}.${mime.extension(message.mimetype)}`;
			const mediaData = await client.decryptMedia(message);
			// const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`;
			const ObjImage = { id, filename, mediaData };
			handleOffer('add', ObjImage);
		}
		await client.sendText(message.from, 'Promoção adicionada com sucesso');
	}
};

module.exports = addOffer;
