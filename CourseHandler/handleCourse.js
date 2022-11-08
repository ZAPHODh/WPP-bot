let Course = [];
const handleCourse = (order, course) => {
	switch (order) {
		case 'add':
			Course.push(course);
			return Course;
		case 'remove':
			Course = Course.filter((o) => o.id !== course);
			return Course;

		default:
			return Course;
	}
};
module.exports = { handleCourse };
