const Months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const stringifyMonth = date => {
	return Months[date.getMonth()];
};

export {stringifyMonth as default};
