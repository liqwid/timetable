import React from 'react';
import _ from 'lodash';
import themeStore from 'stores/themeStore';
import lectureStore from 'stores/lectureStore';
import Header from 'components/commons/header';
import ImageWrap from 'components/commons/imageWrap';
import DeleteButton from 'components/element/deleteButton';
import EditButton from 'components/element/editButton';
import LinkElement from 'components/element/linkElement';

const ThemeElement = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

    render() {
        const id = this.context.router.getCurrentParams().id;
		const theme = _.find(themeStore.data, {id: id});
		const links = _.map(theme.lecturesIds, (lectureId, index) => {
			return <LinkElement
                    dataType = 'lecture'
                    id = {lectureId}
                    value = {lectureStore.getById(lectureId).title}
                    key = {index}
                />;
		});
		return (
            <span>
                <Header value = 'Theme'/>
                <div className='entry-wrap'>
                        <h4 className = 'description-header'>{theme.title}</h4>
                        <h5 className = "description-element">{theme.description}</h5>
                        <h4 className = 'link-header'>Lectures</h4>
                        {links}
                </div>
                <DeleteButton dataType = 'theme' id = {id}/>
                <EditButton dataType = 'theme' id = {id}/>
            </span>
		);
	}
});

export {ThemeElement as default};
