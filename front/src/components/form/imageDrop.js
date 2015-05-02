import React from 'react';

const ImageDrop = React.createClass({
	propTypes: {
		url: React.PropTypes.string
	},

	getInitialState() {
		return {
			image: this.props.url,
			hintText: 'Image Box Click or Drop',
			dragHover: false
		};
	},

	handleClick() {
		React.findDOMNode(this.refs.inputClick).click();
	},

	onDragOver(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
		this.setState({
			dragHover: true,
			hintText: 'Incoming!'
		});
	},

	onDragLeave() {
		this.setState({
			dragHover: false,
			hintText: 'Image Box Click or Drop'
		});
	},

	handleDrop(e) {
		e.preventDefault();
		this.setState({
			dragHover: false,
			hintText: 'Generating preview...'
		});

		let image;
		if (e.dataTransfer) {
			image = e.dataTransfer.files[0];
		} else if (e.target) {
			image = e.target.files[0];
		}

		this.readImage(image);
	},

	handleChange(e) {
		this.readImage(e.target.files[0]);
		e.target.value = null;
		return false;
	},

	readImage(file) {
		let reader = new FileReader();
		reader.onload = this.onReaderLoad;
		reader.readAsDataURL(file);
	},

	onReaderLoad(e) {
		const src = e.target.result;
		this.setState({
			image: src,
			hintText: 'Image Box Click or Drop'
		});
	},
/*		var image = new Image();
		image.src = src;
		image.onload = this.onImageLoad(image);
	},

	onImageLoad(image) {
		const base64image = this.imageProcess(image);
		this.setState({
			image: base64Image,
			hintText: 'Image Box Click or Drop'
		});
	},

	imageProcess(img) {
		let canvas = document.createElement('canvas');

		let width = img.width;
		let height = img.height;

		console.log(img);

		if (width > height) {
			if (width > 300) {
				height = Math.round(height *= 300 / width);
				width = 300;
			}
		} else {
			if (height > 300) {
				width = Math.round(width *= 300 / height);
				height = 300;
			}
		}
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);

		console.log(canvas);

		return canvas.toDataUrl('image/png');
	},*/

	getValue() {
		return this.state.image;
	},

	render() {
		let topShadowClass,
			bottomShadowClass;
		if (this.state.dragHover) {
			topShadowClass = 'box-shadow-hover';
			bottomShadowClass = 'box-shadow-hover-bottom';
		} else {
			topShadowClass = 'box-shadow-inset';
			bottomShadowClass = 'box-shadow-inset-bottom';
		}
		return (
				<div
					className = {'image-drop ' + topShadowClass}
					onClick = {this.handleClick}
					onDragOver = {this.onDragOver}
					onDragLeave = {this.onDragLeave}
					onDrop = {this.handleDrop}
				>
					<div className = {'image-drop-inner ' + bottomShadowClass}>
						<img src = {this.state.image} className = 'image-show'/>
						<h4 className = 'image-drop-label'>
							{this.state.hintText}
						</h4>
						<input
							type = 'file'
							ref = 'inputClick'
							className = 'image-input'
							accept = 'image/png, image/jpeg'
							onChange = {this.handleChange}
						>
						</input>
					</div>
				</div>
		);
	}
});

export {ImageDrop as default};
