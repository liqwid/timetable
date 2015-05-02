import Reflux from 'reflux';
import dataActions from 'actions/dataActions';
import authorStore from 'stores/themeStore';
import lectureStore from 'stores/lectureStore';
import _ from 'lodash';
import storeDataMethods from 'mixins/storeDataMethods';

const themeStore = Reflux.createStore({
	mixins: [storeDataMethods],

	init() {
		this.dataType = 'themes';
		this.listenToMany(dataActions);
	},

	onLoad(data) {
		this.data = data.themes;
		this.data = _.map(this.data, theme => {
			theme.lecturesIds = _.pluck(_.filter(lectureStore.data, lecture => {
			return _.includes(lecture.themesIds, theme.id);
		}), 'id');
			theme.authorsIds = _.flatten(
				_.pluck(_.filter(lectureStore.data,
					{id: theme.lecturesIds}),
					'authorsIds'
				)
			);
			return theme;
		});
		this.trigger();
	}
});

export {themeStore as default};
