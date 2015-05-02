import React from 'react';
import _ from 'lodash';
import authorStore from 'stores/authorStore';
import lectureStore from 'stores/lectureStore';
import formatAuthorString from 'utils/formatAuthorString';
import Header from 'components/commons/header';
import ImageWrap from 'components/commons/imageWrap';
import DeleteButton from 'components/element/deleteButton';
import EditButton from 'components/element/editButton';
import LinkElement from 'components/element/linkElement';

const AuthorElement = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

	render() {
		const id = this.context.router.getCurrentParams().id;
		const author = _.find(authorStore.data, {id:id});
		const links = _.map(author.lecturesIds, (lectureId, index) => {
			return <LinkElement
                    dataType = 'lecture'
                    id = {lectureId}
                    value = {lectureStore.getById(lectureId).title}
                    key = {index}
                />;
		});
		return (
            <span>
                <Header value = 'Author'/>
                <div className='entry-wrap'>
                    <ImageWrap imgUrl = {author.imgUrl} imgSize = 'avatar'>
                        <h4 className = 'description-header'>{formatAuthorString(author)}</h4>
                        <h5 className = "description-element">{author.company}</h5>
                        <h5 className = "description-element">{author.country}</h5>
                        <h4 className = 'link-header'>Lectures</h4>
                        {links}
                    </ImageWrap>
                </div>
                <DeleteButton dataType = 'author' id = {id}/>
                <EditButton dataType = 'author' id = {id}/>
            </span>
		);
	}
});

export {AuthorElement as default};
