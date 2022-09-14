const { create, Client } = require('@open-wa/wa-automate');

const DefinirFun = require('./functions/DefinirFun');
const TraducaoFun = require('./functions/TraducaoFun');
const TotextFun = require('./functions/TotextFun');
const YTDFun = require('./functions/YTDFun');
const ToSticker = require('./functions/ToSticker');
const StickerToImg = require('./functions/StickerToImg');
const FeriadoFun = require('./functions/FeriadoFun');
// const handleUnreadMessages = require('./handleUnreadMessages');
const HandleMessageCollector = require('./HandleMessageCollector');
const Riot = require('./functions/Riot');
const scheduleReminder = require('./handleScheduleRemiver');

require('dotenv').config();

// onde tudo acontece
async function start(client = Client) {
	// const unreadMessages = await client.getAllUnreadMessages();
	// handleUnreadMessages(unreadMessages);
	setInterval(async () => {
		await scheduleReminder(client);
	}, 1000 * 60 * 60 * 24);

	client.onIncomingCall(async (call) => {
		await client.sendText(call.peerJid, 'não posso te atender');
	});

	client.onAnyMessage(async (message) => {
		if (message.text.includes('arroz')) {
			console.log(message);
		}
		if (message.text.includes('!lol')) {
			await Riot(client, message);
		}
		if (message.text.includes('!pais')) {
			await FeriadoFun(message, client);
		}

		if (message.text.includes('!toimg')) {
			await StickerToImg(message, client);
		}
		// Inicio da função de tradução
		if (message.text.includes('!tr') && message.quotedMsg != null) {
			await TraducaoFun(message, client);
		}
		// fim da  função de traduçò

		// inicio da função de definir
		if (message.text.includes('!def')) {
			await DefinirFun(message, client);
		}
		// fim da função de definir

		// inicio da função de mudar imagem pra texto
		if (message.text.includes('!totext') && message.quotedMsg != null) {
			await TotextFun(message, client);
		}
		// fim da função de mudar imagem pra texto
		if (message.text.includes('!r')) {
			if (message.quotedMsg === null) {
				client.sendText(message.from, 'Você não selecionou alguém para banir');
			} else {
				await client.removeParticipant(
					message.chat.groupMetadata.id,
					message.quotedMsg.author,
				);
			}
		}
		if (message.text === '!pic' && message.sender.profilePicThumbObj.imgFull != null) {
			console.log(message);
			console.log(message.sender.profilePicThumbObj);
			const pic = await client.getProfilePicFromServer(message.from);
			await client.sendImage(message.from, pic, pic, 'ó como tu é lindo');
		}

		if (message.text === '!test') {
			await HandleMessageCollector(client, message);
		}

		if (message.text === '!fig' || message.text === '!sti') {
			ToSticker(message, client);
		}
		if (
			message.text.charAt(0) === '!' &&
			message.text.charAt(1) === 'y' &&
			message.text.charAt(2) === 't'
		) {
			await YTDFun(message, client);
		}
	});
}

create({
	sessionId: 'Mauro Chrisostimo',
	licenseKey: process.env.KEY,
	useChrome: true,
	executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
}).then((client) => start(client));
