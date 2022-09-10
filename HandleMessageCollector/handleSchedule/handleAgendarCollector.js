const { handleIgnore } = require('../utils/handleIgnore');
const questions = require('./utils/questions');
const handleEnd = require('./utils/handleEnd');
const profOptions = require('./utils/profOptions');
const b64ify = require('./utils/b64ify');
const handleDate = require('./utils/handleDate');

const AgendarCollector = async (client, message) => {
	handleIgnore('add', message);
	let counter = 0;
	const filter = (m) => m.from === message.from;
	const collector = client.createMessageCollector(message.from, filter, {
		max: 4,
		time: 1000 * 60,
	});
	await client.sendText(message.from, questions[counter++]);

	collector.on('start', async () => {});
	await collector.on('collect', async (m) => {
		if (m) {
			if (counter < questions.length) {
				if (counter === 1) {
					const dates = await handleDate();
					await client.sendListMessage(
						message.from,
						[
							{
								title: 'Escolha a data desejada',
								rows: dates.map((date) => ({
									title: date,
									rowId: b64ify({ date }),
								})),
							},
						],
						`${questions[counter++]} `,
						'Selecione uma data',
						'Datas',
					);
				} else if (counter === 2) {
					await client.sendListMessage(
						message.from,
						[
							{
								title: 'Escolha o que deseja',
								rows: profOptions.map((option) => ({
									title: option,
									rowId: b64ify({ option }),
								})),
							},
						],
						`${questions[counter++]} `,
						'Selecione um dos profissionais',
						'Profissionais',
					);
				} else {
					await client.sendText(message.from, questions[counter++]);
				}
			}
		}
	});
	await collector.on('end', async (data) => {
		await handleEnd(data, client, message);
	});
};

module.exports = AgendarCollector;
