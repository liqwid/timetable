import React from 'react';
import {Paper} from 'material-ui';

const Image = React.createClass({
	propTypes: {
		className: React.PropTypes.string.isRequired,
		src: React.PropTypes.string.isRequired
	},

	render() {
		return (
			<Paper zDepth = {2} className = {this.props.className}>
				<img src = {this.props.src} className = 'image-inner'/>
			</Paper>
		);
	}
});

export {Image as default};
