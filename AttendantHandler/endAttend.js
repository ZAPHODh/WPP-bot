const { handleIgnore } = require('../HandleMessageCollector/utils/handleIgnore');

const endAttend = async (client, message) => {
	await client.sendText(
		message.to,
		'Por favor, avalie o nosso salão e o meu atendimento no link : \n ',
	);
	handleIgnore('remove', message.to);
};

module.exports = endAttend;
