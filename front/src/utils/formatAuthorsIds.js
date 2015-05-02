import _ from 'lodash';
import authorStore from 'stores/authorStore';

const formatAuthorsIds = authorsIds => {
	if (authorsIds.length === 0) return [0];
	const selectedIds = _.map(authorsIds, id => {
		return _.findIndex(authorStore.data, {id: id});
	});
	console.log(selectedIds);
	return selectedIds;
};

export {formatAuthorsIds as default};
