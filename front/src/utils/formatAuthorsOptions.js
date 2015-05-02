import formatAuthorString from 'utils/formatAuthorString';

const formatAuthorsOptions = authors => {
	return authors.map((author, index) => {
		let option = {};
		option.value = formatAuthorString(author);
		option.id = author.id;
		return option;
	});
};

export {formatAuthorsOptions as default};
