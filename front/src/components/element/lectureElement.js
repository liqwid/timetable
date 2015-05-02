import React from 'react';
import _ from 'lodash';
import authorStore from 'stores/authorStore';
import lectureStore from 'stores/lectureStore';
import formatAuthorString from 'utils/formatAuthorString';
import formatThemesString from 'utils/formatThemesString';
import formatTimeString from 'utils/formatTimeString';
import Header from 'components/commons/header';
import ImageWrap from 'components/commons/imageWrap';
import DeleteButton from 'components/element/deleteButton';
import EditButton from 'components/element/editButton';
import LinkElement from 'components/element/linkElement';

const LectureElement = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

	render() {
		const id = this.context.router.getCurrentParams().id;
		const lecture = _.find(lectureStore.data, {id:id});
		const links = _.map(lecture.authorsIds, (authorId, index) => {
			return <LinkElement
                    dataType = 'author'
                    id = {authorId}
                    value = {formatAuthorString(authorStore.getById(authorId))}
                    key = {index}
                />;
		});
		return (
            <span>
                <Header value = 'Lecture'/>
                <div className='entry-wrap'>
                        <h4 className = 'description-header'>{lecture.title}</h4>
                        <h5 className = "description-element">{formatThemesString(lecture.themesIds)}</h5>
                        <h5 className = "description-element">{formatTimeString(lecture.date, lecture.timeslot)}</h5>
                        <h4 className = 'link-header'>Authors</h4>
                        {links}
                </div>
                <DeleteButton dataType = 'lecture' id = {id}/>
                <EditButton dataType = 'lecture' id = {id}/>
            </span>
		);
	}
});

export {LectureElement as default};
