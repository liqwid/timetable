import React from 'react';
import Header from 'components/commons/header';

const NotFound = React.createClass({
	render() {
		return (
			<Header value = 'Sorry, page not found'/>
		);
	}
});

export {NotFound as default};
