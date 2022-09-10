let user = [];

const handleUsers = (order, users) => {
	switch (order) {
		case 'add':
			user.push(users);
			return user;
		case 'remove':
			user = users.filter((user) => user !== users);
			return user;
		default:
			return user;
	}
};

module.exports = { handleUsers };
