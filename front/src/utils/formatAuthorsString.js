import authorStore from 'stores/authorStore';

const formatAuthorsString = authorsIds => {
	if (authorsIds.length === 0) return 'No author is selected for this lecture';
	let result = '';
	authorsIds.forEach(authorId => {
		const author = authorStore.getById(authorId);
		result += author.name + ' ' + author.surname + ', ';
	});
	return result.slice(0, -2);
};

export {formatAuthorsString as default};
