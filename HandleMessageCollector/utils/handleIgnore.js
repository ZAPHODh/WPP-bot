let ignore = [];

const handleIgnore = (order, message) => {
	switch (order) {
		case 'add':
			ignore.push(message.from);
			return ignore;
		case 'remove':
			ignore = ignore.filter((ignored) => ignored !== message);
			return ignore;
		default:
			return ignore;
	}
};

module.exports = { handleIgnore };
