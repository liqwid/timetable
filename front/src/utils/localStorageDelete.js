import _ from 'lodash';

const localStorageDelete = (type, id) => {
	let localStorageData = JSON.parse(localStorage[type]);
	localStorageData = _.reject(localStorageData, {id: id});
	localStorage[type] = JSON.stringify(localStorageData);
};

export {localStorageDelete as default};
