const formatThemesOptions = themes => {
	return themes.map((theme, index) => {
		let option = {};
		option.value = theme.title;
		option.id = theme.id;
		return option;
	});
};

export {formatThemesOptions as default};
