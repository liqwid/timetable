import _ from 'lodash';
import localStoragePost from 'utils/localStoragePost';
import localStorageGet from 'utils/localStorageGet';
import localStorageDelete from 'utils/localStorageDelete';
import generateId from 'utils/generateId';

const storeDataMethods = {

	onRemove(id) {
		if (_.find(this.data, {id: id})) {
			this.data = _.reject(this.data, {id: id});
			localStorageDelete(this.dataType, id);
		} else {
			this.data = _.map(this.data, element => {
				_.pull(element.authorsIds, id);
				_.pull(element.themesIds, id);
				_.pull(element.lecturesIds, id);
				localStoragePost(element, this.dataType);
				return element;
			});
		}
	},

	onPost(data, type) {
		if (type === this.dataType) {
			if (data.id === 'new') {
				data.id = generateId();
			} else {
				this.data = _.reject(this.data, {id: data.id});
			}
			this.data.push(data);
			localStoragePost(data, type);
		}
	},

	getById(id) {
		return _.find(this.data, {id: id});
	}
};

export {storeDataMethods as default};
