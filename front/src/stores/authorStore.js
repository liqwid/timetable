import Reflux from 'reflux';
import dataActions from 'actions/dataActions';
import themeStore from 'stores/themeStore';
import lectureStore from 'stores/lectureStore';
import _ from 'lodash';
import storeDataMethods from 'mixins/storeDataMethods';

const authorStore = Reflux.createStore({
	mixins: [storeDataMethods],

	init() {
		this.dataType = 'authors';
		this.listenToMany(dataActions);
	},

	onLoad(data) {
		this.data = data.authors;
		this.data = _.map(this.data, author => {
			author.lecturesIds = _.pluck(_.filter(lectureStore.data, lecture => {
			return _.includes(lecture.authorsIds, author.id);
		}), 'id');
			author.themesIds = _.flatten(
				_.pluck(_.filter(lectureStore.data,
					{id: author.lecturesIds}),
					'themesIds'
				)
			);
			return author;
		});
		this.trigger();
	}
});

export {authorStore as default};
