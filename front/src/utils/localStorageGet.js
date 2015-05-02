import _ from 'lodash';

const localStorageGet = (type, id) => {
	if (!type && !id) {
		return {
			authors: JSON.parse(localStorage.authors),
			themes: JSON.parse(localStorage.themes),
			lectures: JSON.parse(localStorage.lectures)
			};
	}
	if (!id) {
		return JSON.parse(localStorage[type]);
	}
	return _.find(JSON.parse(localStorage[type]), id);
};

export {localStorageGet as default};
