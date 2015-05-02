import React from 'react';
import authorStore from 'stores/authorStore';
import formatAuthorString from 'utils/formatAuthorString';
import Header from 'components/commons/header';
import ListElement from 'components/list/listElement';
import AddButton from 'components/list/addButton';

const AuthorsList = React.createClass({
    render() {
        const listElements = authorStore.data.map((author, index) => {
            return (<ListElement
                id = {author.id}
                imgUrl = {author.imgUrl}
                title = {formatAuthorString(author)}
                subTitle = {author.company}
                bottomText = {author.country}
                rightText = ''
                dataType = 'author'
                key = {index}
            />);
        });
        const addButton = <AddButton dataType = 'author'/>;
        return (
            <span>
                <Header value = 'Authors'/>
                {listElements}
                {addButton}
            </span>
        );
    }
});

export {AuthorsList as default};
