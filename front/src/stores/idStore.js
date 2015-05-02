import Reflux from 'reflux';
import navigationActions from 'actions/navigationActions';

const idStore = Reflux.createStore({
	init() {
		this.id = '';
		this.listenToMany({navigationActions});
	},

	onNavigate(id) {
		this.id = id;
	}
})