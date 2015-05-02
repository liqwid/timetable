import _ from 'lodash';
import generateId from 'utils/generateId';

const localStoragePost = (data, type) => {
	let newData = JSON.parse(localStorage[type]);
	const oldElementIndex = _.findIndex(newData, {id: data.id});
	if (oldElementIndex > -1) {
		newData[oldElementIndex] = data;
	} else {
		newData.push(data);
	}
	localStorage.setItem(type, JSON.stringify(newData));
};

export {localStoragePost as default};
