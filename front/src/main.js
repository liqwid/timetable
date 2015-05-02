import './main.less';
import React from 'react';
import Router from 'react-router';
import AppRoutes from './appRoutes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
window.React = React;

Router
    .create({
        routes: AppRoutes,
        scrollBehavior: Router.ScrollToTopBehavior
    })
    .run(Handler => {
        React.render(<Handler/>,
            document.getElementById('react-mount')
        );
    });
