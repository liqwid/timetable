import themeStore from 'stores/themeStore';

const formatThemesString = themesIds => {
	if (themesIds.length === 0) return 'No theme is selected for this lecture';
	let result = '';
	themesIds.forEach(themeId => {
		result += themeStore.getById(themeId).title + ', ';
	});
	return result.slice(0, -2);
};

export {formatThemesString as default};
