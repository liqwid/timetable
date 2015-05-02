import React from 'react';

const PageHeader = React.createClass({
	propTypes: {
		value: React.PropTypes.string.isRequired
	},

    render() {
        return (
            <div className = 'entry-wrap'>
                <h3>{this.props.value}</h3>
            </div>
        );
    }
});

export {PageHeader as default};
