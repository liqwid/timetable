import React from 'react';
import Image from 'components/commons/image';

const ImageWrap = React.createClass({
	propTypes: {
		imgUrl: React.PropTypes.string,
		imgSize: React.PropTypes.string
	},

	render() {
		let className = 'position-relative ';
		let image;
		if (this.props.imgUrl) {
			className += 'image-margin-' + this.props.imgSize;
			image = (<Image src = {this.props.imgUrl} className = {this.props.imgSize}/>);
		}
		return (
			<span>
				{image}
				<div className = {className}>
					{this.props.children}
				</div>
				<div className = 'clear-div'/>
			</span>
		);
	}
});

export {ImageWrap as default};
