import React from 'react';
import {Link} from 'react-router';
import {FlatButton} from 'material-ui';

const NavButton = React.createClass({
    propTypes: {
        link: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <Link to = {this.props.link}>
                <FlatButton label = {this.props.link} secondary = {true}/>
            </Link>
        );
    }
});

export {NavButton as default};
