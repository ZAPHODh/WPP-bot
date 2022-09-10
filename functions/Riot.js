require('dotenv').config();

const key = process.env.RIOT_KEY;

const fetch = require('node-fetch');

const Riot = async (client, message) => {
	const player = message.text.substring(5).replace(/\s/g, '');

	const summonerApi = await fetch(
		`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${player}?api_key=${key}`,
	)
		.then((res) => res.json())
		.then((json) => json)
		.catch(async (err) => {
			await client.sendText(message.from, err);
			return err;
		});

	const summonerHistory = await fetch(
		`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerApi.puuid}/ids?start=0&count=10&api_key=${key}`,
	)
		.then((res) => res.json())
		.then((json) => json)
		.catch((err) => err);

	await summonerHistory.map(async (match) => {
		const uniq = await fetch(
			`https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${key}`,
		)
			.then((res) => res.json())
			.then((json) =>
				json.info.participants.filter(
					(participant) => participant.puuid === summonerApi.puuid,
				),
			);
		try {
			await client.sendText(
				message.from,
				`\nChampion: ${uniq[0].championName}\nKDA: ${uniq[0].kills}/${uniq[0].deaths}/${
					uniq[0].assists
				}\nLane: ${
					uniq[0].individualPosition === 'Invalid'
						? 'Não foi possível encontrar'
						: uniq[0].individualPosition
				}\nDano: ${uniq[0].totalDamageDealt} \nScore de visão: ${
					uniq[0].visionScore
				} \nResultado: ${uniq[0].win ? 'Vitória' : 'Derrota'}`,
			);
		} catch (error) {
			await client.sendText(message.from, 'Não foi possível encontrar o histórico');
		}
	});
	// console.log(summonerHistory);
	// try {
	// 	await client.sendText(
	// 		message.from,
	// 		summonerHistory.map((match) => match),
	// 	);
	// } catch (error) {
	// 	await client.sendText(message.from, error);
	// }
};

module.exports = Riot;
