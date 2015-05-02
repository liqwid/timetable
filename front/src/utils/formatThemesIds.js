import _ from 'lodash';
import themeStore from 'stores/themeStore';

const formatThemesIds = themesIds => {
	if (themesIds.length === 0) return [0];
	const selectedIds = _.map(themesIds, id => {
		return _.findIndex(themeStore.data, {id: id});
	});
	return selectedIds;
};

export {formatThemesIds as default};
