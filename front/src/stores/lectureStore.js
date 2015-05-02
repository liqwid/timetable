import Reflux from 'reflux';
import dataActions from 'actions/dataActions';
import storeDataMethods from 'mixins/storeDataMethods';

const lectureStore = Reflux.createStore({
	mixins: [storeDataMethods],

	init() {
		this.dataType = 'lectures';
		this.listenToMany(dataActions);
	},

	onLoad(data) {
		this.data = data.lectures;
		this.data = this.data.map(lecture => {
			lecture.date = new Date(lecture.date);
			return lecture;
		});
		this.trigger();
	}
});

export {lectureStore as default};
