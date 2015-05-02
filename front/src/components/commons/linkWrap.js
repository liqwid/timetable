import React from 'react';
import {Link} from 'react-router';
import navigationActions from 'actions/navigationActions';

const LinkWrap = React.createClass({
	propTypes: {
		url: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired,
		addClassName: React.PropTypes.string
	},

	render() {
		return (
			<Link to = {this.props.url} params = {{id: this.props.id}}>
				<div className = {'hover-light ' + this.props.addClassName}>
					{this.props.children}
				</div>
			</Link>
		);
	}
});

export {LinkWrap as default};
