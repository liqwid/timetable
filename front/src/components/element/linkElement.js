import React from 'react';
import LinkWrap from 'components/commons/linkWrap';
import ImageWrap from 'components/commons/imageWrap';

const LinkElement = React.createClass({
    propTypes: {
        dataType: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        imgUrl: React.PropTypes.string,
        value: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <LinkWrap
                addClassName = 'link-wrap'
                url = {this.props.dataType}
                id = {this.props.id}
            >
                <ImageWrap imgUrl = {this.props.imgUrl} imgSize = 'link'>
                    <h5>{this.props.value}</h5>
                </ImageWrap>
            </LinkWrap>
        );
    }
});

export {LinkElement as default};
