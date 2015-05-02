import React from 'react';
import themeStore from 'stores/themeStore';
import Header from 'components/commons/header';
import ListElement from 'components/list/listElement';
import AddButton from 'components/list/addButton';

const ThemesList = React.createClass({
    render() {
        const listElements = themeStore.data.map((theme, index) => {
            return (<ListElement
                id = {theme.id}
                imgUrl = ''
                title = {theme.title}
                subTitle = ''
                bottomText = ''
                rightText = ''
                dataType = 'theme'
                key = {index}
            />);
        });
        const addButton = <AddButton dataType = 'theme'/>;
        return (
            <span>
                <Header value = 'Themes'/>
                {listElements}
                {addButton}
            </span>
        );
    }
});

export {ThemesList as default};
