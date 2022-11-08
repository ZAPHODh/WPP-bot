const handleDate = async () => {
	const today = new Date();
	const dates = [];
	for (let i = 0; i < 30; i++) {
		const isAble = new Date(new Date().setDate(today.getDate() + i)).getDay();
		if (isAble !== 0 && isAble !== 1) {
			const nextDate = new Date(new Date().setDate(today.getDate() + i)).toLocaleDateString(
				'pt-BR',
			);
			dates.push(nextDate);
		}
	}
	return dates;
};
module.exports = handleDate;
