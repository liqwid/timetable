import React from 'react';
import {Navigation} from 'react-router';
import _ from 'lodash';
import countries from 'utils/countries';
import dataActions from 'actions/dataActions';
import themeStore from 'stores/themeStore';
import Header from 'components/commons/header';
import TextInputField from 'components/form/textInputField';
import ApplyButton from 'components/form/applyButton';
import CancelButton from 'components/form/cancelButton';


const AuthorForm = React.createClass({
    mixins: [Navigation],

	handleSubmit() {
		let theme = {};
		theme.id = this.context.router.getCurrentParams().id;
		theme.title = this.refs.title.getValue();
		theme.description = this.refs.description.getValue();
		if (theme.title) {
			dataActions.post(theme, 'themes');
            if (theme.id === 'new') {
                this.transitionTo('themes');
            } else {
                this.transitionTo('theme', {id: theme.id});
            }
		}
	},

    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

	render() {
		const id = this.context.router.getCurrentParams().id;
		let header;
		let theme = {};
		if (id === 'new') {
			header = 'Add Theme';
			theme.title = '';
			theme.description = '';
		} else {
			header = 'Edit Author Info';
        	theme = _.find(themeStore.data, {id: id});
        }

	    return (
	        <span>
	            <Header value = {header}/>
	            <form onSubmit = {this.handleSubmit}>
	                <div className = 'entry-wrap form-wrap'>
                        <TextInputField
                            value = {theme.title}
                            label = 'Title'
                            required = {true}
                            onSubmit = {this.handleSubmit}
                            multiLine = {true}
                            ref = 'title'
                        />
                        <TextInputField
                            value = {theme.description}
                            label = 'Description'
                            required = {false}
                            onSubmit = {this.handleSubmit}
                            multiLine = {true}
                            ref = 'description'
                        />
	                </div>
	                <ApplyButton
                        dataType = 'theme'
                        id = {id}
                    />
	            </form>
	            <CancelButton 
	            	dataType = 'theme'
	            	id = {id}
            	/>
	        </span>
	    );
	}
});

export {AuthorForm as default};
