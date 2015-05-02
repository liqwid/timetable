import React from 'react';
import LinkWrap from 'components/commons/linkWrap';
import ImageWrap from 'components/commons/imageWrap';

const ListElement = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        imgUrl: React.PropTypes.string,
        title: React.PropTypes.string.isRequired,
        subTitle: React.PropTypes.string,
        rightText: React.PropTypes.string,
        bottomText: React.PropTypes.string,
        dataType: React.PropTypes.string.isRequired
    },

    render() {
        const url = this.props.dataType;
        return (
            <LinkWrap url = {url} id = {this.props.id} addClassName = 'list-element-wrap entry-wrap'>
                <ImageWrap imgUrl = {this.props.imgUrl} imgSize = 'list'>
                    <h4>{this.props.title}</h4>
                    <h5 className = 'right-text'>{this.props.rightText}</h5>
                    <h5>{this.props.subTitle}</h5>
                    <h5 className = 'bottom-text'>{this.props.bottomText}</h5>
                </ImageWrap>
            </LinkWrap>
        );
    }
});

export {ListElement as default};
