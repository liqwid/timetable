import React from 'react';
import lectureStore from 'stores/lectureStore';
import formatTimeString from 'utils/formatTimeString';
import formatThemesString from 'utils/formatThemesString';
import formatAuthorsString from 'utils/formatAuthorsString';
import Header from 'components/commons/header';
import ListElement from 'components/list/listElement';
import AddButton from 'components/list/addButton';

const LecturesList = React.createClass({
    render() {
        const listElements = lectureStore.data.map((lecture, index) => {
            return (<ListElement
                id = {lecture.id}
                imgUrl = ''
                title = {lecture.title}
                subTitle = {formatThemesString(lecture.themesIds)}
                bottomText = {formatAuthorsString(lecture.authorsIds)}
                rightText = {formatTimeString(lecture.date, lecture.timeslot)}
                dataType = 'lecture'
                key = {index}
            />);
        });
        const addButton = <AddButton dataType = 'lecture'/>;
        return (
            <span>
                <Header value = 'Lectures'/>
                {listElements}
                {addButton}
            </span>
        );
    }
});

export {LecturesList as default};
