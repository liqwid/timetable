import React from 'react';
import {Paper} from 'material-ui';

const Page = React.createClass({
    render() {
        return (
            <Paper
            	zDepth = {1}
            	className = 'mui-app-content-canvas content-wrap'
            	innerClassName = 'content-wrap-padding'
        	>
                {this.props.children}
            </Paper>
        );
    }
});

export {Page as default};
