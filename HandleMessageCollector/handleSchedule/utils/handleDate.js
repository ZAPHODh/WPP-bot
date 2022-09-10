const handleDate = async () => {
	const today = new Date();
	const dates = [];
	for (let i = 0; i < 30; i++) {
		const nextDate = new Date(new Date().setDate(today.getDate() + i)).toLocaleDateString(
			'pt-BR',
		);
		dates.push(nextDate);
	}
	return dates;
};
module.exports = handleDate;
