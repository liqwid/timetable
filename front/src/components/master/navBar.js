import React from 'react';
import {AppBar} from 'material-ui';
import NavButton from 'components/master/navButton';

const NavBar = React.createClass({
    render() {

        const navButtonTitles = [
            'lectures',
            'authors',
            'themes'
        ];

        const navButtons = navButtonTitles.map((title, index) => {
            return <NavButton key = {index} link = {title}/>;
        });

        return (
            <AppBar
                className = 'mui-dark-theme'
                title = 'Developers Conference'
                showMenuIconButton = {false}
            >
                <span className = 'float-right-container'>
                        {navButtons}
                </span>
            </AppBar>
        );
    }
});

export {NavBar as default};
