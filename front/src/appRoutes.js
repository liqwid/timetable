import React from 'react';
import {Route, RouteHandler, DefaultRoute, NotFoundRoute} from 'react-router';

import Master from 'components/master/masterPage';
import AuthorsList from 'components/list/authorsList';
import LecturesList from 'components/list/lecturesList';
import ThemesList from 'components/list/themesList';
import AuthorElement from 'components/element/authorElement';
import LectureElement from 'components/element/lectureElement';
import ThemeElement from 'components/element/themeElement';
import AuthorForm from 'components/form/authorForm';
import LectureForm from 'components/form/lectureForm';
import ThemeForm from 'components/form/themeForm';
import NotFound from 'components/notFound';

const WithLayout = React.createClass({
    render() {
        return (
            <Master>
                <RouteHandler/>
            </Master>
        );
    }
});

const AppRoutes = (
    <Route handler = {WithLayout} >
        <Route name = 'author' path = 'author/:id' handler = {AuthorElement}/>
        <Route name = 'lecture' path = 'lecture/:id' handler = {LectureElement}/>
        <Route name = 'theme' path = 'theme/:id' handler = {ThemeElement}/>
        <Route name = 'authorForm' path = 'author/:id/form' handler = {AuthorForm}/>
        <Route name = 'themeForm' path = 'theme/:id/form' handler = {ThemeForm}/>
        <Route name = 'lectureForm' path = 'lecture/:id/form' handler = {LectureForm}/>
        <Route name = 'authors' handler = {AuthorsList}/>
        <Route name = 'themes' handler = {ThemesList}/>
        <DefaultRoute name = 'lectures' handler = {LecturesList}/>
        <NotFoundRoute handler = {NotFound}/>
    </Route>
);

export {AppRoutes as default};
