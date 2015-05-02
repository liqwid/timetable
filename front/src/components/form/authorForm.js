import React from 'react';
import {Navigation} from 'react-router';
import _ from 'lodash';
import countries from 'utils/countries';
import dataActions from 'actions/dataActions';
import authorStore from 'stores/authorStore';
import Header from 'components/commons/header';
import ImageDrop from 'components/form/imageDrop';
import TextInputField from 'components/form/textInputField';
import Select from 'components/form/select';
import ApplyButton from 'components/form/applyButton';
import CancelButton from 'components/form/cancelButton';


const AuthorForm = React.createClass({
    mixins: [Navigation],

	handleSubmit() {
		let author = {};
		author.id = this.context.router.getCurrentParams().id;
		author.imgUrl = this.refs.imageDrop.getValue();
		author.name = this.refs.name.getValue();
		author.surname = this.refs.surname.getValue();
		author.company = this.refs.company.getValue();
		author.country = this.refs.country.getValue();
        if (
            author.name &&
            author.surname &&
            author.company &&
            author.country
        ) {
            dataActions.post(author, 'authors');
            if (author.id === 'new') {
                this.transitionTo('authors');
            } else {
                this.transitionTo('author', {id: author.id});
            }
        }
	},

    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

	render() {
		const id = this.context.router.getCurrentParams().id;
		let header;
		let author = {};
		if (id === 'new') {
			header = 'Add Author';
			author.imgUrl = './img/Blank.jpg'
			author.name = '';
			author.surname = '';
			author.company = '';
			author.country = '';
		} else {
			header = 'Edit Author Info';
        	author = _.find(authorStore.data, {id: id});
        }

	    return (
	        <span>
	            <Header value = {header}/>
	            <form onSubmit = {this.handleSubmit}>
                    <ImageDrop
                        url = {author.imgUrl}
                        ref = 'imageDrop'
                    />
	                <div className = 'entry-wrap form-wrap'>
                        <TextInputField
                            value = {author.name}
                            label = 'First Name'
                            required = {true}
                            onSubmit = {this.handleSubmit}
                            ref = 'name'
                        />
                        <TextInputField
                            value = {author.surname}
                            label = 'Surname'
                            required = {true}
                            onSubmit = {this.handleSubmit}
                            ref = 'surname'
                        />
                        <TextInputField
                            value = {author.company}
                            label = 'Company Title'
                            required = {true}
                            onSubmit = {this.handleSubmit}
                            ref = 'company'
                        />
                        <TextInputField
                            value = {author.country}
                            label = 'Country of Residence'
                            required = {true}
                            onSubmit = {this.handleSubmit}
                            ref = 'country'
                        />
	                </div>
	                <ApplyButton
                        dataType = 'author'
                        id = {id}
                    />
	            </form>
	            <CancelButton
                    dataType = 'author'
                    id = {id}
                />
	        </span>
	    );
	}
});

export {AuthorForm as default};
